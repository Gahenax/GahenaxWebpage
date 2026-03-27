export type OEDAStep = "OBSERVE" | "EVALUATE" | "DECIDE" | "ACT";

export interface SystemState {
  step: OEDAStep;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  friction_index: number;
}

export const L1_ENTRY = {
  id: "ENTRY",
  offer: ["LANDING_PAGES", "AUTOMATION_SETUP", "MARKETING_OPTIMIZATION"],
  goal: "REDUCE_IMMEDIATE_FRICTION",
};

export const L2_CONVERSION = {
  id: "CONVERSION",
  offer: ["SYSTEMS_STRUCTURING", "CRM_INTEGRATION", "FUNNEL_OPTIMIZATION"],
  goal: "SYSTEM_DEPENDENCY",
};

export const L3_SCALING = {
  id: "SCALING",
  offer: ["BUSINESS_OPTIMIZATION", "AI_INTEGRATION", "DECISION_SYSTEMS"],
  goal: "OPERATIONAL_LAYER",
};

export class GAHENAXCore {
  private state: SystemState;

  constructor(initial_input: Record<string, unknown>) {
    this.state = {
      step: "OBSERVE",
      input: initial_input,
      output: null,
      friction_index: 0,
    };
  }

  public async observe() {
    // Detection logic
    this.state.step = "EVALUATE";
    return this.state;
  }

  public async evaluate() {
    // Friction calculation logic
    this.state.step = "DECIDE";
    return this.state;
  }

  public async decide() {
    // Strategy selection logic
    this.state.step = "ACT";
    return this.state;
  }

  public async act() {
    // Execution contract
    this.state.step = "OBSERVE"; // Reset loop
    return this.state;
  }

  public getStatus() {
    return this.state;
  }
}
