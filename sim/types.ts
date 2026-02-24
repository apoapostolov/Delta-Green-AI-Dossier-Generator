// sim/types.ts
export type CareerState =
  | "Education" | "Military" | "LawEnforcement" | "Intelligence"
  | "PrivateSecurity" | "Bureaucrat" | "Academic" | "Medical"
  | "Criminal" | "Unemployed" | "Consultant" | "DeltaGreenAdj";

export type EventKind =
  | "Enroll" | "Graduate" | "Deploy" | "Promotion" | "Transfer" | "Commendation"
  | "Injury" | "Suspension" | "Investigation" | "Coverup" | "Burned"
  | "PartnerDeath" | "FamilyStrain" | "Divorce" | "Award" | "Publication"
  | "Layoff" | "Contract" | "Arrest" | "Acquittal" | "DGIncident"
  | "PermanentInjury" | "KIA"
  // Expanded Professional Kinds
  | "Training" | "DisciplinaryAction" | "Undercover" | "Testimony"
  | "PeerReview" | "ResearchBreakthrough" | "EthicalDilemma"
  | "SpecialAssignment" | "PsychEval" | "FieldMission" | "DeskDuty"
  | "BudgetCuts" | "TechUpgrade" | "Audit" | "DataBreach" | "PublicScandal"
  | "GrantRejected" | "TenureReview" | "PromotionDenied"
  // Expanded Personal Kinds
  | "Marriage" | "Childbirth" | "Hobby" | "FinancialWindfall" | "FinancialHardship"
  | "PersonalLoss" | "HealthScare" | "Relocation" | "FamilyReunion"
  | "PetAdoption" | "HomeImprovement" | "JuryDuty" | "IdentityTheft" | "OldFriend"
  // New Weird Kind
  | "Weird";


export interface CareerStateDetails {
  dangerLevel: 'casual' | 'risky' | 'deadly';
}

export interface SimConfig {
  seed: number;
  startYear: number;
  endYear: number;
  startState?: CareerState;
  baseSan?: number;
  professionRanks?: string[];
  startingAge?: number;
}

export interface EventCheck {
  type: 'attribute' | 'skill';
  name: string;
}

export interface EventOutcome {
  skillChanges?: { name: string; value: '1d4' | '1' | number }[]; // Changed from skillChange to skillChanges array
  attributeChange?: { name: string; value: '1d4' | '1d6' | '1' | number };
  sanChange?: number | '1d3';
  sanLoss?: '1d3' | '1d4' | '1d6';
  bondChange?: number;
  maxHpChange?: '1d3' | number;
}

export interface EventBlueprint {
  kind: EventKind;
  detail: string;
  check: EventCheck;
  onSuccess: EventOutcome;
  onFailure: EventOutcome;
  flags?: string[];
  isAttributeGain?: boolean;
}

export interface Event {
  year: number;
  state: CareerState;
  kind: EventKind;
  detail: string;
  narrative?: string;
  
  check: {
    type: 'attribute' | 'skill';
    name: string;
    target: number;
    roll: number;
    success: boolean;
    isCriticalSuccess?: boolean;
    isFumble?: boolean;
  };
  
  outcome: {
    skillDelta?: Record<string, number>;
    attributeDelta?: Record<string, number>;
    bondDelta?: number;
    sanDelta?: number;
    maxHpDelta?: number;
  };

  flags?: string[];
}

export interface Summary {
  path: CareerState[];
  yearsInState: Record<CareerState, number>;
  finalRank?: string;
  yearsInFinalRank?: number;
  promotionFailures: Record<string, number>;
  majorTraumas: number;
  commendations: number;
  scandals: number;
  dgTouchpoints: number;
  weirdIncidents: number;
  peakSkill?: { name: string; value: number };
}

export interface SimResult {
  startYear: number;
  endYear: number;
  age: number;
  seed: number;
  finalState: CareerState;
  events: Event[];
  skills: Record<string, number>;
  attributeChanges: Record<string, number>;
  sanChange: number;
  bondChange: number;
  maxHpChange: number;
  summary: Summary;
  isDeceased: boolean;
}