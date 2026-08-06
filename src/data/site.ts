export type NavItem = {
  readonly label: string;
  readonly to: string;
};

export type Milestone = {
  readonly name: string;
  readonly shortName: string;
  readonly year: number;
  readonly transistors: number;
  readonly displayCount: string;
};

export type ProcessStage = {
  readonly title: string;
  readonly description: string;
  readonly output: string;
  readonly handoff: string;
};

export type TechnicalArea = {
  readonly title: string;
  readonly description: string;
};

export const site = {
  name: 'Rev Silicon',
  shortDescription:
    'A Texas A&M student organization learning the complete path from chip architecture to fabricated hardware.',
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Join', to: '/join' },
    { label: 'Contact', to: '/contact' },
  ] satisfies readonly NavItem[],
  project: {
    eyebrow: 'Student accelerator project',
    title: 'An open RISC-V GPU accelerator.',
    description:
      'A collaborative platform for learning architecture, RTL, verification, and physical implementation through the open-source Vortex ecosystem.',
    attributes: ['Vortex-based', 'Student-designed', 'Built toward tapeout'] as const,
  },
  milestones: [
    { name: 'Intel 4004', shortName: '4004', year: 1971, transistors: 2_300, displayCount: '2.3 K' },
    { name: 'Intel 8086', shortName: '8086', year: 1978, transistors: 29_000, displayCount: '29 K' },
    { name: 'Intel Pentium', shortName: 'Pentium', year: 1993, transistors: 3_100_000, displayCount: '3.1 M' },
    { name: 'NVIDIA GeForce 256', shortName: 'GeForce 256', year: 1999, transistors: 23_000_000, displayCount: '23 M' },
    { name: 'NVIDIA Tesla V100', shortName: 'Tesla V100', year: 2017, transistors: 21_100_000_000, displayCount: '21.1 B' },
    { name: 'NVIDIA H100', shortName: 'H100', year: 2022, transistors: 80_000_000_000, displayCount: '80 B' },
  ] satisfies readonly Milestone[],
  process: [
    { title: 'Architecture', description: 'Define the system, its behavior, and every interface.', output: 'Architecture specification', handoff: 'Interfaces ready for RTL' },
    { title: 'RTL', description: 'Translate the specification into synthesizable hardware.', output: 'Reviewed RTL', handoff: 'Design ready for verification' },
    { title: 'Verification', description: 'Exercise the design, close coverage, and prove expected behavior.', output: 'Verification evidence', handoff: 'Behavior ready for implementation' },
    { title: 'Physical design', description: 'Floorplan, place, route, and close timing and power.', output: 'Signoff-ready layout', handoff: 'Layout ready for final checks' },
    { title: 'Tapeout', description: 'Complete signoff and prepare the final GDSII submission.', output: 'Fabrication handoff', handoff: 'Design enters the shuttle flow' },
    { title: 'Bring-up', description: 'Test first silicon, validate interfaces, and run workloads.', output: 'Characterized hardware', handoff: 'Results feed the next revision' },
  ] satisfies readonly ProcessStage[],
  areas: [
    { title: 'Architecture', description: 'Microarchitecture studies and the specification the design flow builds from.' },
    { title: 'RTL / Digital design', description: 'Synthesizable HDL, review discipline, linting, and synthesis.' },
    { title: 'Verification', description: 'Testbenches, stimulus, coverage goals, and regression practice.' },
    { title: 'Physical design', description: 'Floorplanning, place and route, timing, and power closure.' },
    { title: 'Tooling / Infrastructure', description: 'Build scripts, CI, and reproducible engineering workflows.' },
    { title: 'Project / Research', description: 'Scope, schedule, documentation, and the technical reading behind it.' },
  ] satisfies readonly TechnicalArea[],
  officerRoles: ['President', 'Vice president', 'Technical lead', 'Operations'] as const,
  interestAreas: ['Architecture', 'RTL', 'Verification', 'Physical design', 'Tooling', 'Project / research'] as const,
  externalLinks: {
    emailLabel: 'Club email — publishing soon',
    githubLabel: 'GitHub — publishing soon',
    communityLabel: 'Community link — publishing soon',
  },
} as const;
