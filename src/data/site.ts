export type NavItem = {
  readonly label: string;
  readonly to: string;
};

export type ProcessStage = {
  readonly title: string;
  readonly summary: string;
};

export type Team = {
  readonly title: string;
  readonly overview: string;
  readonly skills: readonly string[];
};

/** Club moments plotted left to right. `arc` only shapes the visual curve. */
export type TimelineEvent = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly phase: string;
  readonly arc: number;
  readonly side: 'above' | 'below';
  readonly kind: 'milestone' | 'event' | 'workshop';
  readonly detail: string;
};

export type ProjectPhase = {
  readonly window: string;
  readonly title: string;
  readonly detail: string;
};

export type Value = {
  readonly title: string;
  readonly detail: string;
};

export type Officer = {
  readonly role: string;
  readonly focus: string;
};

/**
 * Placeholder destinations. Replace these three before launch. Everything else
 * on the site reads from here.
 */
export const contact = {
  email: 'reveillesilicon@gmail.com',
  instagram: { handle: '@revsilicon', url: 'https://www.instagram.com/revsilicon' },
  linkedin: { handle: '/revsilicon', url: 'https://www.linkedin.com/company/revsilicon' },
  resources: 'https://github.com/revsilicon',
} as const;

export const site = {
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Team', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Join', to: '/join' },
    { label: 'Sponsor', to: '/sponsor' },
  ] satisfies readonly NavItem[],

  values: [
    { title: 'Hands on the tools.', detail: 'You write the RTL, run the simulations, and close the timing.' },
    { title: 'One team, one chip.', detail: 'Four specialties working on a single design, not four side projects.' },
    { title: 'Proof, not theory.', detail: 'Graduate with design work you can put in front of an employer.' },
  ] satisfies readonly Value[],

  /**
   * The industry-standard digital ASIC flow, in order. Each stage feeds the next
   * and every one of them is verified before it hands off.
   */
  process: [
    {
      title: 'Architecture',
      summary: 'Define the instruction set, block boundaries, memory hierarchy, and interfaces before RTL begins.',
    },
    {
      title: 'RTL design',
      summary: 'Translate the architecture into synthesizable SystemVerilog for datapaths, control logic, and block interfaces.',
    },
    {
      title: 'Verification',
      summary: 'Prove the RTL matches the specification with testbenches, assertions, and coverage.',
    },
    {
      title: 'Synthesis',
      summary: 'Map RTL to a gate-level netlist, then evaluate timing, area, and power.',
    },
    {
      title: 'Physical design',
      summary: 'Turn the netlist into a routed layout with a floorplan, power grid, clock tree, and metal routing.',
    },
    {
      title: 'Signoff & tapeout',
      summary: 'Run timing and physical checks, then prepare the final GDSII for fabrication.',
    },
  ] satisfies readonly ProcessStage[],

  teams: [
    {
      title: 'RTL design',
      overview:
        'Write the hardware. You take a block from the architecture spec and turn it into synthesizable SystemVerilog that meets timing.',
      skills: ['SystemVerilog', 'Digital logic', 'Pipelining & FSMs', 'Git review flow'],
    },
    {
      title: 'Verification',
      overview:
        'Break the hardware on purpose. You build testbenches and coverage models that prove a block does exactly what the spec says.',
      skills: ['UVM / cocotb', 'Python', 'Assertions & coverage', 'Debug with waveforms'],
    },
    {
      title: 'Physical design',
      overview:
        'Turn logic into layout. You floorplan, place, route, and close timing on a block using the open-source PDK flow.',
      skills: ['OpenROAD / OpenLane', 'Static timing analysis', 'Floorplanning', 'Linux & Tcl'],
    },
    {
      title: 'AI inference',
      overview:
        'Decide what the silicon is for. You profile ML workloads and shape the accelerator around them: datapath width, memory, and dataflow.',
      skills: ['PyTorch', 'Computer architecture', 'Quantization', 'C++ / Python modeling'],
    },
  ] satisfies readonly Team[],

  /** The recurring rhythm of the club, not a dated event schedule. */
  events: [
    {
      id: 'kickoff', label: 'Kickoff', title: 'Meet the teams', phase: 'Start',
      arc: 0.7, side: 'below', kind: 'event',
      detail: 'Get oriented, meet the team, and find the part of chip design you want to explore.',
    },
    {
      id: 'workshops', label: 'Workshops', title: 'Learn the fundamentals', phase: 'Learn',
      arc: 0.45, side: 'above', kind: 'workshop',
      detail: 'Build confidence with digital logic, hardware description, simulation, and team workflows.',
    },
    {
      id: 'build-nights', label: 'Build nights', title: 'Make it real', phase: 'Build',
      arc: 0.58, side: 'below', kind: 'event',
      detail: 'Work alongside other members, turn ideas into RTL, and learn through iteration.',
    },
    {
      id: 'speakers', label: 'Industry talks', title: 'Meet semiconductor engineers', phase: 'Connect',
      arc: 0.3, side: 'above', kind: 'event',
      detail: 'Hear how engineers approach the work, the industry, and the path from school to silicon.',
    },
    {
      id: 'labs', label: 'Open labs', title: 'Test and debug together', phase: 'Test',
      arc: 0.43, side: 'below', kind: 'workshop',
      detail: 'Read waveforms, find bugs, and sharpen your engineering instincts with the team.',
    },
    {
      id: 'showcase', label: 'Showcase', title: 'Share what we built', phase: 'Share',
      arc: 0.22, side: 'above', kind: 'milestone',
      detail: 'Bring the work together, share what changed, and set the direction for the next build.',
    },
  ] satisfies readonly TimelineEvent[],

  /** Design-flow schedule for the accelerator itself. */
  projectPhases: [
    { window: 'Fall 2026', title: 'Architecture', detail: 'ISA subset, block diagram, and interface contracts frozen.' },
    { window: 'Spring 2027', title: 'RTL design', detail: 'Core, scheduler, and memory path written to spec.' },
    { window: 'Spring 2027', title: 'Verification', detail: 'Block-level testbenches and coverage closure.' },
    { window: 'Summer 2027', title: 'Synthesis', detail: 'Gate-level netlist mapped to the open standard-cell library.' },
    { window: 'Summer 2027', title: 'Physical design', detail: 'Floorplan, place, route, and timing closure.' },
    { window: 'Fall 2027', title: 'Signoff & tapeout', detail: 'DRC, LVS, STA, and GDSII submission.' },
  ] satisfies readonly ProjectPhase[],

  project: {
    eyebrow: 'Project 01',
    title: 'An open RISC-V accelerator.',
    description:
      'Our first chip is a small RISC-V GPGPU built on the open-source Vortex ecosystem.',
    attributes: ['RISC-V, Vortex-based', 'Open-source PDK flow', 'Targeting a 2027 shuttle'] as const,
  },

  officers: [
    { role: 'President', focus: 'Strategy, partnerships, and club direction.' },
    { role: 'Vice president', focus: 'Team coordination and day-to-day execution.' },
    { role: 'Architecture lead', focus: 'Technical roadmap, standards, and integration.' },
    { role: 'Operations lead', focus: 'Events, outreach, and member experience.' },
  ] satisfies readonly Officer[],
} as const;
