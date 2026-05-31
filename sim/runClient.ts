// sim/runClient.ts
import type { SimConfig, SimResult } from './types';

const workerCode = `
// --- Inlined Worker Code (Pure JavaScript) ---

function mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}

function pick(rng, items) {
  if (!items || items.length === 0) return null;
  const total = items.reduce((s,x)=>s+x.w,0);
  let r = rng()*total;
  for (const it of items){ if ((r -= it.w) <= 0) return it.item; }
  return items[items.length-1].item;
}
const d3 = (rng) => Math.floor(rng()*3)+1;
const d4 = (rng) => Math.floor(rng()*4)+1;
const d6 = (rng) => Math.floor(rng()*6)+1;

const careerStateDetails = {
  Education: { dangerLevel: 'casual' }, Military: { dangerLevel: 'deadly' }, LawEnforcement: { dangerLevel: 'deadly' },
  Intelligence: { dangerLevel: 'risky' }, PrivateSecurity: { dangerLevel: 'deadly' }, Bureaucrat: { dangerLevel: 'casual' },
  Academic: { dangerLevel: 'casual' }, Medical: { dangerLevel: 'casual' }, Criminal: { dangerLevel: 'deadly' },
  Unemployed: { dangerLevel: 'casual' }, Consultant: { dangerLevel: 'risky' }, DeltaGreenAdj: { dangerLevel: 'deadly' }
};

const weirdEvents=[{item:{kind:"Weird",detail:"Woke up with a memory of a day that never happened.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:10},{item:{kind:"Weird",detail:"A phone call consisted of static that formed into your name.",check:{type:'attribute',name:'INT'},onSuccess:{},onFailure:{sanChange:-1}},w:10},{item:{kind:"Weird",detail:"Saw a face in a crowd that had no features.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:8},{item:{kind:"Weird",detail:"Found a book in a used bookstore written in a language that doesn't exist.",check:{type:'skill',name:'Occult'},onSuccess:{},onFailure:{sanChange:-1}},w:7},{item:{kind:"Weird",detail:"A street camera seemed to follow you for three blocks.",check:{type:'skill',name:'Alertness'},onSuccess:{},onFailure:{sanChange:-1}},w:10},{item:{kind:"Weird",detail:"Your reflection in a window didn't move for a full second.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:6},{item:{kind:"Weird",detail:"Received an email from your own address, dated ten years in the future.",check:{type:'skill',name:'Computer Science'},onSuccess:{},onFailure:{sanChange:-1}},w:5},{item:{kind:"Weird",detail:"Heard a radio broadcast detailing your exact actions from the previous day.",check:{type:'skill',name:'SIGINT'},onSuccess:{},onFailure:{sanChange:-1}},w:4},{item:{kind:"Weird",detail:"All the clocks in your home stopped at the exact same time.",check:{type:'attribute',name:'INT'},onSuccess:{},onFailure:{sanChange:-1}},w:9},{item:{kind:"Weird",detail:"A stranger on the street whispered a secret you've never told anyone.",check:{type:'attribute',name:'CHA'},onSuccess:{},onFailure:{sanChange:-1}},w:3},];
const personalEvents=[{item:{kind:"Marriage",detail:"Entered into a marriage.",check:{type:'attribute',name:'CHA'},onSuccess:{sanChange:'1d3'},onFailure:{}},w:5},{item:{kind:"Childbirth",detail:"A child was born.",check:{type:'attribute',name:'CON'},onSuccess:{sanChange:'1d3'},onFailure:{}},w:4},{item:{kind:"Divorce",detail:"Marriage ended in divorce.",check:{type:'attribute',name:'CHA'},onSuccess:{},onFailure:{sanChange:-2,bondChange:-1}},w:3},{item:{kind:"Hobby",detail:"Developed a new personal hobby.",check:{type:'attribute',name:'INT'},onSuccess:{skillChanges:[{name:'Art',value:'1d4'}],sanChange:1},onFailure:{}},w:8},{item:{kind:"FinancialWindfall",detail:"Received a small inheritance.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:1},onFailure:{}},w:2},{item:{kind:"FinancialHardship",detail:"Faced unexpected financial hardship.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:3},{item:{kind:"Relocation",detail:"Moved to a new city for personal reasons.",check:{type:'attribute',name:'CHA'},onSuccess:{},onFailure:{}},w:6},{item:{kind:"HealthScare",detail:"Dealt with a significant but non-permanent health issue.",check:{type:'attribute',name:'CON'},onSuccess:{sanChange:-1},onFailure:{sanChange:-2}},w:4},{item:{kind:"PersonalLoss",detail:"Experienced the death of a close family member or friend.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:-2},onFailure:{sanChange:-3,bondChange:-1}},w:3},{item:{kind:"PetAdoption",detail:"Adopted a pet.",check:{type:'attribute',name:'CHA'},onSuccess:{sanChange:1},onFailure:{}},w:7},{item:{kind:"OldFriend",detail:"Reconnected with a friend from the past.",check:{type:'attribute',name:'CHA'},onSuccess:{sanChange:1},onFailure:{}},w:5},{item:{kind:"IdentityTheft",detail:"Victim of identity theft, spending months sorting it out.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'}]},onFailure:{sanChange:-2}},w:2},{item:{kind:"JuryDuty",detail:"Served on a jury for a disturbing criminal trial.",check:{type:'skill',name:'Law'},onSuccess:{skillChanges:[{name:'Law',value:'1'}]},onFailure:{sanChange:-1}},w:4},];
const militaryEvents=[{item:{kind:"Deploy",detail:"Routine overseas deployment.",check:{type:'attribute',name:'CON'},onSuccess:{skillChanges:[{name:'Survival',value:'1d4'}]},onFailure:{skillChanges:[{name:'Survival',value:'1'}],sanChange:-1}},w:20},{item:{kind:"Transfer",detail:"Reassigned to a new domestic base.",check:{type:'attribute',name:'CHA'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1'}]},onFailure:{}},w:15},{item:{kind:"Commendation",detail:"Received a unit citation for exceptional performance.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:1},onFailure:{}},w:10},{item:{kind:"Training",detail:"Completed a specialized training course (e.g., SERE).",check:{type:'attribute',name:'CON'},onSuccess:{skillChanges:[{name:'Survival',value:'1d4'},{name:'Navigate',value:'1d4'}],sanChange:1},onFailure:{skillChanges:[{name:'Survival',value:'1'}]}},w:8},{item:{kind:"Deploy",detail:"Deployed to active combat zone.",check:{type:'skill',name:'Firearms'},onSuccess:{skillChanges:[{name:'Firearms',value:'1d4'}],sanChange:-1},onFailure:{skillChanges:[{name:'Firearms',value:'1'}],sanChange:-2}},w:8},{item:{kind:"Injury",detail:"Sustained a non-critical injury during training.",check:{type:'attribute',name:'DEX'},onSuccess:{},onFailure:{sanChange:-1,attributeChange:{name:'DEX',value:-1}}},w:7},{item:{kind:"Investigation",detail:"Participated in a JAG investigation.",check:{type:'skill',name:'Law'},onSuccess:{skillChanges:[{name:'Law',value:'1d4'}]},onFailure:{skillChanges:[{name:'Law',value:'1'}]}},w:5},{item:{kind:"FamilyStrain",detail:"Extended deployment caused strain on a personal relationship.",check:{type:'attribute',name:'CHA'},onSuccess:{},onFailure:{bondChange:-1}},w:5},{item:{kind:"DisciplinaryAction",detail:"Faced a non-judicial punishment for a minor infraction.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:4},{item:{kind:"SpecialAssignment",detail:"Assigned to a joint task force with other agencies.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'},{name:'HUMINT',value:'1d4'}]},onFailure:{}},w:3},{item:{kind:"Coverup",detail:"Involved in sanitizing an after-action report for a botched operation.",check:{type:'attribute',name:'INT'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'}]},onFailure:{sanChange:-1,skillChanges:[{name:'Bureaucracy',value:'1'}]},flags:["classified"]},w:3},{item:{kind:"PsychEval",detail:"Underwent a mandatory psychological evaluation.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{}},w:6},{item:{kind:"DeskDuty",detail:"Assigned to a year of administrative desk duty.",check:{type:'attribute',name:'INT'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'}]},onFailure:{sanChange:-1}},w:7},{item:{kind:"DGIncident",detail:"Participated in the retrieval of an asset that was not entirely human.",check:{type:'attribute',name:'POW'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-5,skillChanges:[{name:'Unnatural',value:'1d4'}]},flags:["classified"]},w:2},];
const lawEnforcementEvents=[{item:{kind:"Investigation",detail:"Worked a series of routine cases.",check:{type:'skill',name:'Criminology'},onSuccess:{skillChanges:[{name:'Criminology',value:'1d4'}]},onFailure:{skillChanges:[{name:'Criminology',value:'1'}]}},w:20},{item:{kind:"Transfer",detail:"Assigned to a different precinct or department.",check:{type:'attribute',name:'CHA'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1'}]},onFailure:{}},w:15},{item:{kind:"Commendation",detail:"Received a departmental commendation for closing a case.",check:{type:'attribute',name:'INT'},onSuccess:{sanChange:1},onFailure:{}},w:10},{item:{kind:"Testimony",detail:"Provided key testimony in a major trial.",check:{type:'skill',name:'Persuade'},onSuccess:{skillChanges:[{name:'Law',value:'1d4'}],sanChange:1},onFailure:{sanChange:-1}},w:7},{item:{kind:"Investigation",detail:"Led a high-profile, media-intensive investigation.",check:{type:'skill',name:'Persuade'},onSuccess:{skillChanges:[{name:'Persuade',value:'1d4'}]},onFailure:{sanChange:-1}},w:7},{item:{kind:"Injury",detail:"Injured during the apprehension of a suspect.",check:{type:'attribute',name:'STR'},onSuccess:{},onFailure:{attributeChange:{name:'CON',value:-1},sanChange:-1}},w:6},{item:{kind:"DisciplinaryAction",detail:"Faced an Internal Affairs review.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-2}},w:5},{item:{kind:"Undercover",detail:"Completed a short-term undercover assignment.",check:{type:'skill',name:'Stealth'},onSuccess:{skillChanges:[{name:'Disguise',value:'1d4'},{name:'Persuade',value:'1d4'}]},onFailure:{sanChange:-1}},w:4},{item:{kind:"Suspension",detail:"Placed on administrative leave pending an internal investigation.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:-1},onFailure:{sanChange:-2}},w:5},{item:{kind:"PartnerDeath",detail:"Partner was killed in the line of duty under bizarre circumstances.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:-2},onFailure:{sanChange:-5,bondChange:-1}},w:2},{item:{kind:"FieldMission",detail:"Participated in a high-risk tactical raid.",check:{type:'skill',name:'Firearms'},onSuccess:{skillChanges:[{name:'Firearms',value:'1d4'}]},onFailure:{sanChange:-1}},w:8},{item:{kind:"Audit",detail:"Evidence room was audited, requiring extensive paperwork.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'}]},onFailure:{}},w:6},{item:{kind:"DGIncident",detail:"Investigated a crime scene with physically impossible characteristics.",check:{type:'attribute',name:'INT'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-5,skillChanges:[{name:'Unnatural',value:'1d4'}]},flags:["classified"]},w:3},{item:{kind:"Coverup",detail:"Forced to sign off on a case report that omitted key, unexplainable evidence.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{sanChange:-1},onFailure:{sanChange:-2},flags:["classified"]},w:4},];
const intelligenceEvents=[{item:{kind:"Investigation",detail:"Conducted routine analysis of signals intelligence.",check:{type:'skill',name:'SIGINT'},onSuccess:{skillChanges:[{name:'SIGINT',value:'1d4'}]},onFailure:{skillChanges:[{name:'SIGINT',value:'1'}]}},w:20},{item:{kind:"Transfer",detail:"Reassigned to a different analytical desk.",check:{type:'attribute',name:'INT'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1'}]},onFailure:{}},w:15},{item:{kind:"FamilyStrain",detail:"The secretive nature of the job created distance in a relationship.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{bondChange:-1}},w:5},{item:{kind:"Investigation",detail:"Ran a sensitive human intelligence (HUMINT) operation overseas.",check:{type:'skill',name:'HUMINT'},onSuccess:{skillChanges:[{name:'HUMINT',value:'1d4'}]},onFailure:{sanChange:-1,skillChanges:[{name:'HUMINT',value:'1'}]}},w:8},{item:{kind:"Training",detail:"Underwent advanced polygraph and interrogation training.",check:{type:'skill',name:'Persuade'},onSuccess:{skillChanges:[{name:'HUMINT',value:'1d4'}],sanChange:1},onFailure:{}},w:7},{item:{kind:"Coverup",detail:"Authored a sanitized report to conceal operational failures from oversight.",check:{type:'attribute',name:'INT'},onSuccess:{sanChange:-1},onFailure:{sanChange:-2},flags:["classified"]},w:7},{item:{kind:"Burned",detail:"An asset was compromised, forcing an emergency exfiltration.",check:{type:'attribute',name:'DEX'},onSuccess:{skillChanges:[{name:'Stealth',value:'1d4'}]},onFailure:{sanChange:-2}},w:4},{item:{kind:"DataBreach",detail:"A secure network was breached, leading to a frantic internal damage assessment.",check:{type:'skill',name:'Computer Science'},onSuccess:{skillChanges:[{name:'Computer Science',value:'1d4'}]},onFailure:{sanChange:-2}},w:4},{item:{kind:"BudgetCuts",detail:"Program budget cuts forced the cancellation of a key project.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{},onFailure:{sanChange:-1}},w:6},{item:{kind:"DGIncident",detail:"Analyzed intercepted communications that contained non-human patterns.",check:{type:'skill',name:'SIGINT'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-5,skillChanges:[{name:'Unnatural',value:'1d4'}]},flags:["classified"]},w:3},{item:{kind:"DGIncident",detail:"Debriefed a field agent who had gone insane after a mission.",check:{type:'skill',name:'Psychotherapy'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-2,skillChanges:[{name:'Unnatural',value:'1'}]}},w:2},];
const academicEvents=[{item:{kind:"Publication",detail:"Published a well-received paper in a respected journal.",check:{type:'skill',name:'Science'},isAttributeGain:true,onSuccess:{skillChanges:[{name:'Science',value:'1d4'}],sanChange:1},onFailure:{skillChanges:[{name:'Science',value:'1'}]}},w:20},{item:{kind:"Award",detail:"Secured a significant grant for a new research project.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'}],sanChange:1},onFailure:{skillChanges:[{name:'Bureaucracy',value:'1'}]}},w:15},{item:{kind:"Investigation",detail:"Spent a year on sabbatical conducting field research.",check:{type:'attribute',name:'INT'},onSuccess:{skillChanges:[{name:'Survival',value:'1d4'}]},onFailure:{skillChanges:[{name:'Survival',value:'1'}]}},w:10},{item:{kind:"PeerReview",detail:"Engaged in a contentious peer review process.",check:{type:'attribute',name:'INT'},onSuccess:{},onFailure:{sanChange:-1}},w:8},{item:{kind:"ResearchBreakthrough",detail:"Made a significant breakthrough in their field of study.",check:{type:'skill',name:'Science'},onSuccess:{skillChanges:[{name:'Science',value:'1d4'}],sanChange:1},onFailure:{}},w:7},{item:{kind:"EthicalDilemma",detail:"Faced an ethical dilemma regarding research funding or methodology.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:5},{item:{kind:"TenureReview",detail:"Underwent a stressful tenure review process.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{sanChange:1},onFailure:{sanChange:-2}},w:8},{item:{kind:"GrantRejected",detail:"A major grant proposal was rejected, jeopardizing research.",check:{type:'skill',name:'Persuade'},onSuccess:{},onFailure:{sanChange:-1}},w:6},{item:{kind:"DGIncident",detail:"Discovered an artifact during fieldwork that defied all known science.",check:{type:'skill',name:'Archaeology'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-2,skillChanges:[{name:'Unnatural',value:'1d4'}]},flags:["classified"]},w:3},{item:{kind:"DGIncident",detail:"While researching an obscure text, discovered a passage that was actively hostile.",check:{type:'skill',name:'Occult'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-2,skillChanges:[{name:'Unnatural',value:'1d4'}]},flags:["classified"]},w:5},];
const genericEvents=[{item:{kind:"Contract",detail:"Took on a challenging but rewarding project.",check:{type:'attribute',name:'INT'},isAttributeGain:true,onSuccess:{skillChanges:[{name:'Persuade',value:'1d4'}],sanChange:1},onFailure:{skillChanges:[{name:'Persuade',value:'1'}]}},w:15},{item:{kind:"FamilyStrain",detail:"Work-life imbalance led to friction at home.",check:{type:'attribute',name:'CHA'},onSuccess:{},onFailure:{bondChange:-1}},w:10},{item:{kind:"Layoff",detail:"Position was eliminated due to corporate restructuring.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:-1},onFailure:{sanChange:-2}},w:5},{item:{kind:"TechUpgrade",detail:"Company-wide technology upgrade required extensive retraining.",check:{type:'skill',name:'Computer Science'},onSuccess:{skillChanges:[{name:'Computer Science',value:'1d4'}]},onFailure:{}},w:8},{item:{kind:"PublicScandal",detail:"A public scandal damaged the organization's reputation.",check:{type:'attribute',name:'POW'},onSuccess:{},onFailure:{sanChange:-1}},w:3},];
const eventTables = {
    Military: [...militaryEvents], LawEnforcement: [...lawEnforcementEvents], Intelligence: [...intelligenceEvents], Academic: [...academicEvents],
    PrivateSecurity: [...militaryEvents.slice(0, 5), ...lawEnforcementEvents.slice(0, 5), ...genericEvents],
    Bureaucrat: [...intelligenceEvents.slice(0, 5), ...genericEvents],
    Medical: [...academicEvents.slice(0, 3), { item: { kind: "EthicalDilemma", detail: "Patient presented with an impossible-to-diagnose illness.", check: { type: 'skill', name: 'Medicine' }, onSuccess: { skillChanges: [{ name: 'Medicine', value: '1d4' }] }, onFailure: { sanChange: -1 } }, w: 10 }, ...genericEvents],
    Criminal: [{item:{kind:"Arrest",detail:"Arrested on suspicion, but charges were dropped.",check:{type:'skill',name:'Law'},onSuccess:{skillChanges:[{name:'Law',value:'1d4'}]},onFailure:{sanChange:-1}},w:15},{item:{kind:"Injury",detail:"Injured during a high-stakes illegal enterprise.",check:{type:'attribute',name:'CON'},onSuccess:{},onFailure:{sanChange:-1,attributeChange:{name:'CON',value:-1}}},w:10},{item:{kind:"Contract",detail:"Completed a lucrative but dangerous job.",check:{type:'skill',name:'Stealth'},onSuccess:{skillChanges:[{name:'Stealth',value:'1d4'}]},onFailure:{skillChanges:[{name:'Stealth',value:'1'}]}},w:20}],
    Unemployed: [...genericEvents.filter(e => e.item.kind === 'Layoff' || e.item.kind === 'FamilyStrain')],
    Consultant: [...intelligenceEvents.slice(0, 2), ...academicEvents.slice(0, 2), ...genericEvents],
    Education: [
        { item: { kind: "Graduate", detail: "Graduated with honors in a relevant field.", check: { type: 'attribute', name: 'INT' }, onSuccess: { skillChanges: [{ name: 'Science', value: '1d4' }] }, onFailure: { skillChanges: [{ name: 'Science', value: '1' }] } }, w: 1 }
    ],
    DeltaGreenAdj: [{item:{kind:"DGIncident",detail:"Participated in a full-scale Delta Green operation.",check:{type:'attribute',name:'POW'},onSuccess:{skillChanges:[{name:'Unnatural',value:'1'}]},onFailure:{sanChange:-5,skillChanges:[{name:'Unnatural',value:'1d4'}]},flags:["classified"]},w:25},{item:{kind:"Coverup",detail:"Tasked with cleaning up and containing the aftermath of an operation.",check:{type:'skill',name:'Bureaucracy'},onSuccess:{sanChange:-1},onFailure:{sanChange:-2},flags:["classified"]},w:15},{item:{kind:"Investigation",detail:"Spent months monitoring a potential unnatural threat.",check:{type:'skill',name:'Alertness'},onSuccess:{skillChanges:[{name:'Alertness',value:'1d4'}]},onFailure:{skillChanges:[{name:'Alertness',value:'1'}]}},w:10},{item:{kind:"SpecialAssignment",detail:"Activated as a 'friendly' asset on another agency's investigation.",check:{type:'skill',name:'HUMINT'},onSuccess:{skillChanges:[{name:'Bureaucracy',value:'1d4'}]},onFailure:{}},w:8},{item:{kind:"EthicalDilemma",detail:"Forced to sacrifice an innocent to contain a threat.",check:{type:'attribute',name:'POW'},onSuccess:{sanChange:-2},onFailure:{sanChange:-5,bondChange:-1}},w:5},],
};

const transitions = {
  Education:[{item:"Military",w:20},{item:"LawEnforcement",w:20},{item:"Academic",w:10},{item:"PrivateSecurity",w:10},{item:"Unemployed",w:5},{item:"Criminal",w:3},{item:"Consultant",w:2},{item:"Education",w:5},{item:"Intelligence",w:10},{item:"Medical",w:5}],
  Military:[{item:"Military",w:60},{item:"LawEnforcement",w:10},{item:"Intelligence",w:10},{item:"PrivateSecurity",w:10},{item:"Consultant",w:5},{item:"Unemployed",w:5}],
  LawEnforcement:[{item:"LawEnforcement",w:65},{item:"Intelligence",w:8},{item:"PrivateSecurity",w:10},{item:"Consultant",w:7},{item:"Unemployed",w:5},{item:"Criminal",w:5}],
  Intelligence:[{item:"Intelligence",w:70},{item:"Consultant",w:10},{item:"PrivateSecurity",w:10},{item:"Unemployed",w:5},{item:"LawEnforcement",w:5}],
  PrivateSecurity:[{item:"PrivateSecurity",w:65},{item:"Consultant",w:15},{item:"Unemployed",w:10},{item:"LawEnforcement",w:10}],
  Bureaucrat:[{item:"Bureaucrat",w:70},{item:"Consultant",w:10},{item:"Unemployed",w:10},{item:"PrivateSecurity",w:10}],
  Academic:[{item:"Academic",w:70},{item:"Consultant",w:10},{item:"Intelligence",w:5},{item:"Unemployed",w:10},{item:"PrivateSecurity",w:5}],
  Medical:[{item:"Medical",w:70},{item:"Consultant",w:15},{item:"Unemployed",w:10},{item:"PrivateSecurity",w:5}],
  Criminal:[{item:"Criminal",w:60},{item:"Unemployed",w:20},{item:"PrivateSecurity",w:20}],
  Unemployed:[{item:"Unemployed",w:50},{item:"PrivateSecurity",w:20},{item:"Bureaucrat",w:10},{item:"LawEnforcement",w:10},{item:"Criminal",w:10}],
  Consultant:[{item:"Consultant",w:60},{item:"PrivateSecurity",w:20},{item:"Intelligence",w:10},{item:"Unemployed",w:10}],
  DeltaGreenAdj:[{item:"DeltaGreenAdj",w:80},{item:"Consultant",w:10},{item:"Unemployed",w:10}],
};

function getDiceValue(rng, val) {
    if (val === '1d3') return d3(rng); if (val === '1d4') return d4(rng); if (val === '1d6') return d6(rng);
    if (val === '1') return 1; return val;
}

function processOutcome(rng, outcome, isAttributeGain, currentSkills, isCritical) {
    const result = { skillDelta: {}, attributeDelta: {} };
    if (outcome.sanChange) result.sanDelta = getDiceValue(rng, outcome.sanChange);
    if (outcome.sanLoss) result.sanDelta = -getDiceValue(rng, outcome.sanLoss);
    if (outcome.bondChange && rng() < 0.1) result.bondDelta = outcome.bondChange;
    if (outcome.maxHpChange) result.maxHpDelta = getDiceValue(rng, outcome.maxHpChange) * -1;
    if (outcome.skillChanges) {
        for (const sc of outcome.skillChanges) {
            let value;
            if (isCritical && sc.value === 1) {
                value = 2;
            } else if (isCritical && sc.value === '1d4') {
                value = 4;
            } else {
                value = getDiceValue(rng, sc.value);
            }
            result.skillDelta[sc.name] = (result.skillDelta[sc.name] || 0) + value;
        }
    }
    if (isAttributeGain && outcome.attributeChange) {
        if (rng() < 0.15) {
            const value = getDiceValue(rng, outcome.attributeChange.value);
            result.attributeDelta[outcome.attributeChange.name] = value;
        } else {
            const skillOptions = Object.keys(currentSkills);
            const fallbackSkill = skillOptions.length > 0 ? skillOptions[Math.floor(rng() * skillOptions.length)] : 'Alertness';
            result.skillDelta[fallbackSkill] = (result.skillDelta[fallbackSkill] || 0) + d4(rng);
        }
    } else if (outcome.attributeChange) {
        const value = getDiceValue(rng, outcome.attributeChange.value);
        result.attributeDelta[outcome.attributeChange.name] = value;
    }
    return result;
}

function summarize(events, start, end, finalState, skills, finalRank, yearsInFinalRank, promotionFailures) {
    const yearsInState = {}; let commendations=0, scandals=0, dg=0, trauma=0, weird=0; const statesVisited = [];
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
    return { path: statesVisited, yearsInState, finalRank, yearsInFinalRank, promotionFailures, majorTraumas: trauma, commendations, scandals, dgTouchpoints: dg, weirdIncidents: weird, peakSkill: peakSkill?{name:peakSkill[0],value:peakSkill[1]}:undefined };
}

function simulate(cfg) {
    const rng = mulberry32(cfg.seed|0); const start = cfg.startYear, end = cfg.endYear;
    let state = cfg.startState ?? "Education";
    const skills = {}; const attributeChanges = {};
    const events = []; let isDeceased = false;
    const baseAttributes = { STR: 10, CON: 10, DEX: 10, INT: 10, POW: 10, CHA: 10 };
    let san = baseAttributes.POW * 5;
    const maxSan = san;

    // Promotion trackers
    let currentRankIndex = 0;
    let yearsAtCurrentRank = 0;
    let successesAtRank = 0;
    let critSuccessesAtRank = 0;
    let critFailLockout = false;
    const promotionFailures = {};
    let consecutivePromotionFailures = 0;

    for (let year = start; year <= end; year++){
        yearsAtCurrentRank++;

        const processAndAddEvent = (blueprint) => {
            const currentAttributes = {...baseAttributes, ...attributeChanges};
            const target = blueprint.check.type === 'skill' ? (skills[blueprint.check.name] || 0) : (currentAttributes[blueprint.check.name] * 5);
            const roll = Math.floor(rng() * 100) + 1;
            const success = roll <= target;
            
            const isFumble = roll === 100;
            const isCriticalSuccess = success && !isFumble && (roll === 1 || (roll > 10 && roll % 11 === 0));
            
            if (success && !isFumble) successesAtRank++;
            if (isCriticalSuccess) critSuccessesAtRank++;
            if (isFumble) {
                successesAtRank = 0;
                critSuccessesAtRank = 0;
                critFailLockout = true;
            }

            let outcomeBlueprint = success ? blueprint.onSuccess : blueprint.onFailure;
            if (blueprint.kind === "Weird") {
                if (isCriticalSuccess) {
                    outcomeBlueprint = { sanChange: 1 };
                } else if (isFumble) {
                    outcomeBlueprint = { sanLoss: '1d4' };
                }
            }
            const finalOutcome = processOutcome(rng, outcomeBlueprint, blueprint.isAttributeGain, skills, isCriticalSuccess);

            if (finalOutcome.sanDelta) {
                const oldSan = san;
                const newSan = san + finalOutcome.sanDelta;
                if (finalOutcome.sanDelta > 0) san = Math.min(maxSan, newSan); else san = newSan;
                finalOutcome.sanDelta = san - oldSan;
            }
            
            if (finalOutcome.skillDelta) Object.entries(finalOutcome.skillDelta).forEach(([k,v]) => skills[k] = (skills[k]||0)+v);
            if (finalOutcome.attributeDelta) Object.entries(finalOutcome.attributeDelta).forEach(([k,v]) => attributeChanges[k] = (attributeChanges[k]||0)+v);
            
            events.push({ 
                year, state, kind: blueprint.kind, detail: blueprint.detail, flags: blueprint.flags, 
                check: { type: blueprint.check.type, name: blueprint.check.name, target, roll, success, isCriticalSuccess, isFumble }, 
                outcome: finalOutcome 
            });
        };

        // Weird Event Check
        const unnaturalSkill = skills['Unnatural'] || 0;
        const weirdChance = Math.max(0.01, unnaturalSkill / 200);
        if (rng() < weirdChance) {
            const blueprint = pick(rng, weirdEvents);
            processAndAddEvent(blueprint);
            continue; // Weird events preempt all others.
        }
        
        // Promotion Check
        if (cfg.professionRanks && currentRankIndex < cfg.professionRanks.length - 1) {
            const rankModifier = Math.pow(0.8, currentRankIndex);
            const baseChanceForRank = 0.03 * rankModifier;
            const baseChance = yearsAtCurrentRank * baseChanceForRank;
            const successBonus = critFailLockout ? 0 : successesAtRank * 0.01;
            const critSuccessBonus = critFailLockout ? 0 : critSuccessesAtRank * 0.025;
            const promotionChance = baseChance + successBonus + critSuccessBonus;

            if (rng() < promotionChance) {
                let promotionCheckBonus = Math.min(60, consecutivePromotionFailures * 20);
                const nextRankName = cfg.professionRanks[currentRankIndex + 1];
                if (currentRankIndex === 0 && promotionFailures[nextRankName] > 0) {
                    promotionCheckBonus += 20;
                }
                const bureaucracyTarget = skills['Bureaucracy'] || 0;
                const currentAttributes = {...baseAttributes, ...attributeChanges};
                const chaTarget = (currentAttributes.CHA || 10) * 3;
                const checkTarget = Math.max(bureaucracyTarget, chaTarget) + promotionCheckBonus;
                const checkName = bureaucracyTarget >= chaTarget ? 'Bureaucracy' : 'CHA x3';
                
                const checkRoll = Math.floor(rng() * 100) + 1;
                const checkSuccess = checkRoll <= checkTarget;
                
                let promotionEvent;
                if (checkSuccess) {
                    const oldRank = cfg.professionRanks[currentRankIndex];
                    currentRankIndex++;
                    const newRank = cfg.professionRanks[currentRankIndex];
                    const detail = \`Promoted from \${oldRank} to \${newRank}.\`;
                    
                    promotionEvent = {
                        year, state, kind: "Promotion", detail,
                        check: { type: 'skill', name: checkName, target: checkTarget, roll: checkRoll, success: true },
                        outcome: { sanDelta: currentRankIndex + 1 }
                    };
                    events.push(promotionEvent);
                    
                    yearsAtCurrentRank = 0;
                    successesAtRank = 0;
                    critSuccessesAtRank = 0;
                    critFailLockout = false;
                    consecutivePromotionFailures = 0;
                } else {
                    const detail = \`Promotion review board denied advancement.\`;
                    const failedRank = cfg.professionRanks[currentRankIndex + 1];
                    promotionFailures[failedRank] = (promotionFailures[failedRank] || 0) + 1;

                    promotionEvent = {
                        year, state, kind: "PromotionDenied", detail,
                        check: { type: 'skill', name: checkName, target: checkTarget, roll: checkRoll, success: false },
                        outcome: { sanDelta: -1 }
                    };
                    events.push(promotionEvent);
                    
                    successesAtRank = 0;
                    critSuccessesAtRank = 0;
                    critFailLockout = false;
                    consecutivePromotionFailures++;
                }
                
                if(promotionEvent.outcome.sanDelta) {
                    const oldSan = san;
                    san += promotionEvent.outcome.sanDelta;
                    promotionEvent.outcome.sanDelta = san - oldSan;
                }
                continue;
            }
        }
        
        const dangerLevel = careerStateDetails[state]?.dangerLevel || 'casual';
        const catastrophicRoll = rng();
        let catastrophicEvent = false;

        const triggerPermanentInjury = () => {
            let sanLoss;
            if (rng() < 0.5) {
                const hpLoss = d3(rng);
                sanLoss = d4(rng);
                events.push({ year, state, kind: "PermanentInjury", detail: \`Sustained a grievous wound, reducing maximum HP by \${hpLoss}.\`, check: {type:'attribute', name:'CON', target:0, roll:100, success:false}, outcome:{maxHpDelta:-hpLoss, sanDelta: -sanLoss} });
            } else {
                const physicalAttrs = ['STR', 'CON', 'DEX', 'INT'];
                const attr = physicalAttrs[Math.floor(rng() * physicalAttrs.length)];
                const loss = rng() < 0.15 ? d6(rng) : d4(rng);
                sanLoss = d6(rng);
                attributeChanges[attr] = (attributeChanges[attr] || 0) - loss;
                events.push({ year, state, kind: "PermanentInjury", detail: \`Sustained a permanent injury, reducing \${attr} by \${loss}.\`, check: {type:'attribute', name:'CON', target:0, roll:100, success:false}, outcome:{attributeDelta:{[attr]:-loss}, sanDelta: -sanLoss} });
            }
            san -= sanLoss;
            catastrophicEvent = true;
        };
        
        const triggerKIA = () => {
            events.push({ year, state, kind: "KIA", detail: "Killed in action during a classified operation.", check: {type:'attribute', name:'POW', target:0, roll:100, success:false}, outcome:{} });
            isDeceased = true;
            catastrophicEvent = true;
        };
        
        if (dangerLevel === 'deadly') {
            if (catastrophicRoll < 0.01) { triggerKIA(); } 
            else if (catastrophicRoll < 0.03) { triggerPermanentInjury(); }
        } else if (dangerLevel === 'risky') {
            if (catastrophicRoll < 0.01) { triggerPermanentInjury(); }
        }
        
        if (isDeceased) break;
        if (catastrophicEvent) continue;

        // --- Standard Events ---
        
        // Career Event (80% chance)
        const careerTable = eventTables[state] || [];
        if (careerTable.length > 0 && rng() < 0.8) {
            const blueprint = pick(rng, careerTable);
            processAndAddEvent(blueprint);
        }

        // Personal Event (30% chance)
        if (rng() < 0.3) {
            const blueprint = pick(rng, personalEvents);
            processAndAddEvent(blueprint);
        }

        const next = transitions[state] ? pick(rng, transitions[state]) : state;
        if (state !== "DeltaGreenAdj" && events.some(x=>x.kind==="DGIncident") && rng() < 0.2) state = "DeltaGreenAdj";
        else state = next;
    }
    const finalRank = cfg.professionRanks ? cfg.professionRanks[currentRankIndex] : "N/A";
    const summary = summarize(events, start, end, state, skills, finalRank, yearsAtCurrentRank, promotionFailures);
    
    const finalAttributeChanges = {}; const finalSkillGains = {}; let finalSanChange = 0; let finalBondChange = 0; let finalMaxHpChange = 0;
    events.forEach(e => {
        if(e.outcome.attributeDelta) Object.entries(e.outcome.attributeDelta).forEach(([k,v]) => finalAttributeChanges[k] = (finalAttributeChanges[k]||0)+v);
        if(e.outcome.skillDelta) Object.entries(e.outcome.skillDelta).forEach(([k,v]) => finalSkillGains[k] = (finalSkillGains[k]||0)+v);
        if(e.outcome.sanDelta) finalSanChange += e.outcome.sanDelta;
        if(e.outcome.bondDelta) finalBondChange += e.outcome.bondDelta;
        if(e.outcome.maxHpChange) finalMaxHpChange += e.outcome.maxHpChange;
    });
    
    return { startYear:start, endYear:end, age: (end - start) + (cfg.startingAge || 22), seed:cfg.seed, finalState:state, events, skills: finalSkillGains, attributeChanges: finalAttributeChanges, bondChange: finalBondChange, sanChange: finalSanChange, maxHpChange: finalMaxHpChange, summary, isDeceased };
}

self.onmessage = (ev) => {
    const res = simulate(ev.data);
    self.postMessage(res);
};
`;

let worker: Worker | null = null;

export const runSimulation = (config: SimConfig): Promise<SimResult> => {
    return new Promise((resolve, reject) => {
        if (worker) {
            worker.terminate();
        }

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        worker = new Worker(workerUrl);

        worker.onmessage = (event: MessageEvent<SimResult>) => {
            resolve(event.data);
            if (worker) {
                worker.terminate();
                worker = null;
            }
            URL.revokeObjectURL(workerUrl);
        };

        worker.onerror = (error) => {
            reject(new Error(`Career simulation worker failed: ${error.message}`));
            if (worker) {
                worker.terminate();
                worker = null;
            }
            URL.revokeObjectURL(workerUrl);
        };

        worker.postMessage(config);
    });
};
