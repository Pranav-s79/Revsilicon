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
  readonly name?: string;
  readonly photo?: string;
  readonly major?: string;
  readonly gradYear?: string;
  readonly bio?: string;
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

/**
 * Officers without a name yet render as a placeholder card ("Profile coming
 * soon") using the club mark in place of a portrait. Drop a photo into
 * assets/officers/ and reference it here via `photo` once it's ready.
 *
 * Typed separately from `site` (rather than inline) so the optional fields
 * stay optional — `site`'s trailing `as const` would otherwise narrow each
 * officer to its own literal shape and break `officer.photo` access for
 * entries that don't set every field.
 */
const officers: readonly Officer[] = [
  {
    role: 'President',
    name: 'Tony Buie',
    major: 'Electrical Engineering',
    gradYear: '2028',
    bio: 'Tony sets the roadmap and keeps the four teams pointed at the same chip. He got hooked on hardware taking apart everything he could find, and now spends most of his time split between datasheets and onboarding the club’s newest members.',
  },
  { role: 'Vice president' },
  { role: 'Architecture lead' },
  { role: 'Operations lead' },
];

export const site = {
  nav: [
    { label: 'Home', to: '/' },
    { label: 'Team', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Join', to: '/join' },
    { label: 'Sponsor', to: '/sponsor' },
  ] satisfies readonly NavItem[],

  values: [
    { title: 'Start from zero', detail: 'We teach the full ASIC flow, no experience needed.' },
    { title: 'Your block, our chip', detail: 'Four teams, one design.' },
    { title: 'Leave with silicon', detail: 'Graduate having carried a design all the way to fabrication.' },
  ] satisfies readonly Value[],

  /**
   * The industry-standard digital ASIC flow, in order. Each stage feeds the next
   * and every one of them is verified before it hands off.
   */
  process: [
    {
      title: 'Architecture',
      summary: 'Define architectural and microarchitectural specifications, subsystem boundaries, interfaces, memory organization, and design constraints before RTL implementation.',
    },
    {
      title: 'RTL design',
      summary: 'Implement the defined microarchitecture in synthesizable SystemVerilog, including datapaths, control logic, state, and subsystem interfaces.',
    },
    {
      title: 'Verification',
      summary: 'Verify the RTL against the specification using simulation, assertions, coverage, and formal checks.',
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
      title: 'AI architecture',
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
      detail: 'Build confidence with digital logic, hardware description languages, simulation, and team workflows.',
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
    title: 'A GPU with AI inference acceleration.',
    description:
      'Our first chip, built on the open-source Vortex GPGPU.',
    attributes: ['RISC-V, Vortex-based', 'Open-source PDK flow', 'Targeting a 2027 shuttle'] as const,
  },

  officers,
} as const;
