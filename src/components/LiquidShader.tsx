import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
  precision highp float;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;

  float band(vec2 uv, float phase, float scale) {
    float wave = sin(uv.x * scale + phase + sin(uv.y * 5.0 - phase) * 0.72);
    wave += sin(uv.x * (scale * 0.47) - phase * 0.66 + uv.y * 8.0) * 0.38;
    return wave;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 centered = uv - 0.5;
    centered.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.13;
    float foldA = smoothstep(0.31, 0.82, band(centered + uPointer * 0.022, t, 7.2));
    float foldB = smoothstep(0.48, 0.94, band(centered.yx, -t * 0.72, 9.5));
    float foldC = smoothstep(0.60, 0.96, sin((centered.x - centered.y) * 10.0 + t * 1.2));

    vec3 nearBlack = vec3(0.011, 0.021, 0.034);
    vec3 navy = vec3(0.025, 0.073, 0.125);
    vec3 graphite = vec3(0.13, 0.15, 0.17);
    vec3 maroon = vec3(0.31, 0.0, 0.0);
    vec3 pearl = vec3(0.88, 0.85, 0.79);

    vec3 color = mix(nearBlack, navy, 0.46 + uv.y * 0.18);
    color = mix(color, graphite, foldA * 0.35);
    color = mix(color, maroon, foldB * 0.25);
    color = mix(color, pearl, foldC * foldA * 0.16);

    float centerShade = smoothstep(0.74, 0.08, length(centered * vec2(0.82, 1.0)));
    color *= mix(0.76, 1.07, 1.0 - centerShade);

    float gridX = 1.0 - smoothstep(0.0, 0.028, abs(fract(uv.x * 18.0) - 0.5));
    float gridY = 1.0 - smoothstep(0.0, 0.028, abs(fract(uv.y * 10.0) - 0.5));
    color += vec3(0.18, 0.2, 0.21) * max(gridX, gridY) * 0.045;

    float vignette = smoothstep(0.9, 0.2, length(centered));
    color *= 0.7 + vignette * 0.42;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export function LiquidShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
    } catch (error) {
      console.warn('Liquid WebGL background is unavailable; using the static material fallback.', error);
      canvas.classList.add('is-unavailable');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ fragmentShader, vertexShader, uniforms });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const width = Math.max(clientWidth, 1);
      const height = Math.max(clientHeight, 1);
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    };

    const onPointerMove = (event: PointerEvent) => {
      uniforms.uPointer.value.set(event.clientX / window.innerWidth - 0.5, 0.5 - event.clientY / window.innerHeight);
    };

    let frame = 0;
    const start = performance.now();
    const render = (now: number) => {
      uniforms.uTime.value = reduceMotion ? 1.5 : (now - start) / 1000;
      renderer.render(scene, camera);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();
    render(start);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      canvas.classList.add('is-unavailable');
    };
    canvas.addEventListener('webglcontextlost', onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div className="liquid-fallback" aria-hidden="true" />
      <canvas ref={canvasRef} className="liquid-canvas" aria-hidden="true" />
    </>
  );
}
