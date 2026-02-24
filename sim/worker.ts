// sim/worker.ts
import { CareerState, Event, EventBlueprint, EventOutcome, SimConfig, SimResult, Summary } from "./types";
// FIX: Updated import path to point to the `index` file in the `sim-events` directory, resolving ambiguity with the obsolete `sim-events.ts` file.
import { eventTables } from '../sim-events/index';

// Minimal deterministic PRNG
// FIX: Added explicit return type for the higher-order function to ensure correct type inference.
function mulberry32(a: number): () => number {return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}

type Weight<T> = { item: T; w: number };
function pick<T>(rng:()=>number, items: Weight<T>[]): T {
  if (!items || items.length === 0) return null as any;
  const total = items.reduce((s,x)=>s+x.w,0);
  let r = rng()*total;
  for (const it of items){ if ((r -= it.w) <= 0) return it.item; }
  return items[items.length-1].item;
}
// FIX: Added explicit number return types to dice roller helpers.
const d3 = (rng:()=>number): number => Math.floor(rng()*3)+1;
const d4 = (rng:()=>number): number => Math.floor(rng()*4)+1;
const d6 = (rng:()=>number): number => Math.floor(rng()*6)+1;

const transitions: Record<CareerState, Weight<CareerState>[]> = {
  Education:       [{item:"Military",w:20},{item:"LawEnforcement",w:20},{item:"Academic",w:10},{item:"PrivateSecurity",w:10},{item:"Unemployed",w:5},{item:"Criminal",w:3},{item:"Consultant",w:2},{item:"Education",w:5},{item:"Intelligence",w:10},{item:"Medical",w:5}],
  Military:        [{item:"Military",w:60},{item:"LawEnforcement",w:10},{item:"Intelligence",w:10},{item:"PrivateSecurity",w:10},{item:"Consultant",w:5},{item:"Unemployed",w:5}],
  LawEnforcement:  [{item:"LawEnforcement",w:65},{item:"Intelligence",w:8},{item:"PrivateSecurity",w:10},{item:"Consultant",w:7},{item:"Unemployed",w:5},{item:"Criminal",w:5}],
  Intelligence:    [{item:"Intelligence",w:70},{item:"Consultant",w:10},{item:"PrivateSecurity",w:10},{item:"Unemployed",w:5},{item:"LawEnforcement",w:5}],
  PrivateSecurity: [{item:"PrivateSecurity",w:65},{item:"Consultant",w:15},{item:"Unemployed",w:10},{item:"LawEnforcement",w:10}],
  Bureaucrat:      [{item:"Bureaucrat",w:70},{item:"Consultant",w:10},{item:"Unemployed",w:10},{item:"PrivateSecurity",w:10}],
  Academic:        [{item:"Academic",w:70},{item:"Consultant",w:10},{item:"Intelligence",w:5},{item:"Unemployed",w:10},{item:"PrivateSecurity",w:5}],
  Medical:         [{item:"Medical",w:70},{item:"Consultant",w:15},{item:"Unemployed",w:10},{item:"PrivateSecurity",w:5}],
  Criminal:        [{item:"Criminal",w:60},{item:"Unemployed",w:20},{item:"PrivateSecurity",w:20}],
  Unemployed:      [{item:"Unemployed",w:50},{item:"PrivateSecurity",w:20},{item:"Bureaucrat",w:10},{item:"LawEnforcement",w:10},{item:"Criminal",w:10}],
  Consultant:      [{item:"Consultant",w:60},{item:"PrivateSecurity",w:20},{item:"Intelligence",w:10},{item:"Unemployed",w:10}],
  DeltaGreenAdj:   [{item:"DeltaGreenAdj",w:80},{item:"Consultant",w:10},{item:"Unemployed",w:10}],
};

const isMissionLike = (s: CareerState) => ['Military', 'LawEnforcement', 'Intelligence', 'PrivateSecurity', 'Criminal', 'DeltaGreenAdj'].includes(s);

function getDiceValue(rng: ()=>number, val: '1d3' | '1d4' | '1d6' | '1' | number): number {
    if (val === '1d3') return d3(rng);
    if (val === '1d4') return d4(rng);
    if (val === '1d6') return d6(rng);
    if (val === '1') return 1;
    return val;
}

function processOutcome(rng: ()=>number, outcome: EventOutcome, isAttributeGain: boolean | undefined, currentSkills: Record<string, number>): Event['outcome'] {
    const result: Event['outcome'] = {
        skillDelta: {},
        attributeDelta: {},
    };

    // FIX: Use getDiceValue to correctly handle dice strings like '1d3' for sanChange.
    if (outcome.sanChange) result.sanDelta = getDiceValue(rng, outcome.sanChange);
    // Bond loss is rare
    if (outcome.bondChange && rng() < 0.1) result.bondDelta = outcome.bondChange;
    if (outcome.maxHpChange) result.maxHpDelta = getDiceValue(rng, outcome.maxHpChange) * -1; // HP changes are negative

    // FIX: Changed from skillChange to iterate over skillChanges array to support multiple skill gains.
    if (outcome.skillChanges) {
        for (const sc of outcome.skillChanges) {
            const value = getDiceValue(rng, sc.value);
            result.skillDelta![sc.name] = (result.skillDelta![sc.name] || 0) + value;
        }
    }
    
    if (isAttributeGain && outcome.attributeChange) {
        // 15% chance to gain an attribute, otherwise it becomes a skill gain
        if (rng() < 0.15) {
            const value = getDiceValue(rng, outcome.attributeChange.value);
            result.attributeDelta![outcome.attributeChange.name] = value;
        } else {
            const skillOptions = Object.keys(currentSkills);
            const fallbackSkill = skillOptions.length > 0 ? skillOptions[Math.floor(rng() * skillOptions.length)] : 'Alertness';
            result.skillDelta![fallbackSkill] = (result.skillDelta![fallbackSkill] || 0) + d4(rng);
        }
    } else if (outcome.attributeChange) {
        const value = getDiceValue(rng, outcome.attributeChange.value);
        result.attributeDelta![outcome.attributeChange.name] = value;
    }

    return result;
}

function summarize(events: Event[], start: number, end: number, finalState: CareerState, skills: Record<string,number>): Summary {
  const yearsInState: any = {};
  let commendations=0, scandals=0, dg=0, trauma=0, weird=0;
  const statesVisited: CareerState[] = [];
  let prevYear = start, prevState = events[0]?.state ?? "Education";
  for (const e of events){
    if (!yearsInState[prevState]) yearsInState[prevState]=0;
    yearsInState[prevState]+= Math.max(0, e.year - prevYear);
    prevYear = e.year; prevState = e.state;
    if (!statesVisited.includes(e.state)) statesVisited.push(e.state);
    if (e.kind==="Commendation" || e.kind==="Award" || e.kind==="Promotion") commendations++;
    if (e.kind==="Suspension" || e.kind==="Coverup" || e.kind==="Arrest") scandals++;
    if (e.kind==="DGIncident") dg++;
    if (e.kind==="Weird") weird++;
    if (e.kind==="PartnerDeath" || e.kind==="Injury" || e.kind === "PermanentInjury") trauma++;
  }
  yearsInState[finalState] = (yearsInState[finalState]??0) + (end - prevYear + 1);
  const peakSkill = Object.entries(skills).sort((a,b)=>b[1]-a[1])[0];
  return {
    path: statesVisited,
    yearsInState,
    finalRank: undefined,
    yearsInFinalRank: undefined,
    promotionFailures: {},
    majorTraumas: trauma,
    commendations,
    scandals,
    dgTouchpoints: dg,
    weirdIncidents: weird,
    peakSkill: peakSkill?{name:peakSkill[0],value:peakSkill[1]}:undefined,
  };
}

export function simulate(cfg: SimConfig): SimResult {
  const rng = mulberry32(cfg.seed|0);
  const start = cfg.startYear, end = cfg.endYear;
  let state: CareerState = cfg.startState ?? "Education";
  let bondChange = 0;
  let sanChange = 0;
  let maxHpChange = 0;

  const skills: Record<string,number> = {};
  const attributeChanges: Record<string, number> = {};
  const events: Event[] = [];
  let isDeceased = false;
  
  // Dummy starting attributes for checks before real ones exist.
  const baseAttributes = { STR: 10, CON: 10, DEX: 10, INT: 10, POW: 10, CHA: 10 };

  for (let year = start; year <= end; year++){
    // Catastrophic Events
    if (rng() < 0.01) { // 1% chance of a major life event
        if (isMissionLike(state) && rng() < 0.5) { // 50% of that 1% is death on mission
            events.push({ year, state, kind: "KIA", detail: "Killed in action during a classified operation.", check: {type:'attribute', name:'POW', target:0, roll:100, success:false}, outcome:{} });
            isDeceased = true;
            break;
        } else { // Otherwise, permanent injury
            if (rng() < 0.5) { // 50% chance for HP loss
                const hpLoss = d3(rng);
                maxHpChange -= hpLoss;
                sanChange -= d4(rng);
                events.push({ year, state, kind: "PermanentInjury", detail: `Sustained a grievous wound, reducing maximum HP by ${hpLoss}.`, check: {type:'attribute', name:'CON', target:0, roll:100, success:false}, outcome:{maxHpDelta:-hpLoss, sanDelta: -d4(rng)} });
            } else { // 50% chance for attribute loss
                const physicalAttrs = ['STR', 'CON', 'DEX', 'INT'];
                const attr = physicalAttrs[Math.floor(rng() * physicalAttrs.length)];
                const loss = rng() < 0.15 ? d6(rng) : d4(rng);
                attributeChanges[attr] = (attributeChanges[attr] || 0) - loss;
                sanChange -= d6(rng);
                events.push({ year, state, kind: "PermanentInjury", detail: `Sustained a permanent injury, reducing ${attr} by ${loss}.`, check: {type:'attribute', name:'CON', target:0, roll:100, success:false}, outcome:{attributeDelta:{[attr]:-loss}, sanDelta: -d6(rng)} });
            }
        }
    }

    // Normal Events
    const table = eventTables[state] ?? [];
    if (table.length && rng() < 0.8) { // 80% chance for an event
      const blueprint: EventBlueprint = pick(rng, table);
      
      const currentAttributes = {...baseAttributes, ...attributeChanges};
      const target = blueprint.check.type === 'skill' ? (skills[blueprint.check.name] || 0) : (currentAttributes[blueprint.check.name as keyof typeof baseAttributes] * 5);
      const roll = Math.floor(rng() * 100) + 1;
      const success = roll <= target;

      const outcomeBlueprint = success ? blueprint.onSuccess : blueprint.onFailure;
      const finalOutcome = processOutcome(rng, outcomeBlueprint, blueprint.isAttributeGain, skills);

      if (finalOutcome.skillDelta) {
          Object.entries(finalOutcome.skillDelta).forEach(([k,v]) => skills[k] = (skills[k]||0)+v);
      }
      if (finalOutcome.attributeDelta) {
          Object.entries(finalOutcome.attributeDelta).forEach(([k,v]) => attributeChanges[k] = (attributeChanges[k]||0)+v);
      }
      if (finalOutcome.sanDelta) sanChange += finalOutcome.sanDelta;
      if (finalOutcome.bondDelta) bondChange += finalOutcome.bondDelta;
      if (finalOutcome.maxHpDelta) maxHpChange += finalOutcome.maxHpDelta;
      
      events.push({ year, state, kind: blueprint.kind, detail: blueprint.detail, flags: blueprint.flags, check: { type: blueprint.check.type, name: blueprint.check.name, target, roll, success }, outcome: finalOutcome });
    }

    // State Transition
    const next = transitions[state] ? pick(rng, transitions[state]) : state;
    if (state !== "DeltaGreenAdj" && events.some(x=>x.kind==="DGIncident") && rng() < 0.2) {
      state = "DeltaGreenAdj";
    } else {
      state = next;
    }
  }
  const summary = summarize(events, start, end, state, skills);
  
  // Aggregate all attribute changes into a final object for the result
  const finalAttributeChanges: Record<string, number> = {};
  events.forEach(e => {
      if(e.outcome.attributeDelta){
          Object.entries(e.outcome.attributeDelta).forEach(([k,v]) => finalAttributeChanges[k] = (finalAttributeChanges[k]||0)+v);
      }
  });

  // And skills
  const finalSkillGains: Record<string, number> = {};
  events.forEach(e => {
    if(e.outcome.skillDelta){
        Object.entries(e.outcome.skillDelta).forEach(([k,v]) => finalSkillGains[k] = (finalSkillGains[k]||0)+v);
    }
  });


  return { 
      startYear:start, 
      endYear:end, 
      age:(end-start+17), 
      seed:cfg.seed, 
      finalState:state, 
      events, 
      skills: finalSkillGains, 
      attributeChanges: finalAttributeChanges,
      bondChange, 
      sanChange,
      maxHpChange,
      summary,
      isDeceased,
    };
}

self.onmessage = (ev: MessageEvent<SimConfig>) => {
  const res = simulate(ev.data);
  (self as any).postMessage(res);
};