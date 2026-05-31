// sim-events/details.ts
import type { CareerState, CareerStateDetails } from "../sim/types";

export const careerStateDetails: Record<CareerState, CareerStateDetails> = {
  Education:       { dangerLevel: 'casual' },
  Military:        { dangerLevel: 'deadly' },
  LawEnforcement:  { dangerLevel: 'deadly' },
  Intelligence:    { dangerLevel: 'risky' },
  PrivateSecurity: { dangerLevel: 'deadly' },
  Bureaucrat:      { dangerLevel: 'casual' },
  Academic:        { dangerLevel: 'casual' },
  Medical:         { dangerLevel: 'casual' },
  Criminal:        { dangerLevel: 'deadly' },
  Unemployed:      { dangerLevel: 'casual' },
  Consultant:      { dangerLevel: 'risky' },
  DeltaGreenAdj:   { dangerLevel: 'deadly' },
};
