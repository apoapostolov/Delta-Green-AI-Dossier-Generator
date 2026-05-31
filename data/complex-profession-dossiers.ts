import type { Profession } from '../types';
import { ORGANIZATION_DOSSIERS } from './complex-org-dossiers';

type ChoiceGroup = Profession['choiceGroups'][number];

interface ComplexProfessionSeed {
  name: string;
  baseProfession: string;
  organization: string;
  description: string;
  professionText?: string;
  bonusSkills: string[];
  equipment: string;
  notes: string[];
  bonds?: number;
  professionalSkills?: Profession['professionalSkills'];
  choiceGroups?: ChoiceGroup[];
  bonusSkillAdvancements?: number;
  equipmentKit?: string[];
  specialTrainings?: string[];
  page?: number;
}

const BASE_PROFESSION_ALIASES: Record<string, string> = {
  'Anthropologist': 'Anthropologist or Historian',
  'Anthropologist or Historian': 'Anthropologist or Historian',
  'Computer Scientist': 'Computer Scientist or Engineer',
  'Computer Scientist or Engineer': 'Computer Scientist or Engineer',
  'Engineer': 'Computer Scientist or Engineer',
  'Federal Agent': 'Federal Agent',
  'Firefighter': 'Firefighter',
  'Foreign Service Officer': 'Foreign Service Officer',
  'Historian': 'Anthropologist or Historian',
  'Intelligence Analyst': 'Intelligence Analyst',
  'Intelligence Case Officer': 'Intelligence Case Officer',
  'Lawyer': 'Lawyer or Business Executive',
  'Lawyer or Business Executive': 'Lawyer or Business Executive',
  'Media Specialist': 'Media Specialist',
  'Nurse or Paramedic': 'Nurse or Paramedic',
  'Paramedic': 'Nurse or Paramedic',
  'Physician': 'Physician',
  'Pilot': 'Pilot or Sailor',
  'Pilot or Sailor': 'Pilot or Sailor',
  'Police Officer': 'Police Officer',
  'Program Manager': 'Program Manager',
  'Scientist': 'Scientist',
  'Soldier': 'Soldier or Marine',
  'Soldier or Marine': 'Soldier or Marine',
  'Sailor': 'Pilot or Sailor',
  'Soldier or Sailor': 'Soldier or Marine',
  'Special Operator': 'Special Operator',
};

const makeInfoId = (name: string) =>
  `complex_profession_${name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;

const seed = (
  name: string,
  baseProfession: string,
  organization: string,
  description: string,
  bonusSkills: string[],
  equipment: string,
  notes: string[],
  overrides: Partial<ComplexProfessionSeed> = {}
): ComplexProfessionSeed => ({
  name,
  baseProfession,
  organization,
  description,
  bonusSkills,
  equipment,
  notes,
  ...overrides,
});

const joinHumanList = (items: string[]): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
};

const COMPLEX_PROFESSION_SEEDS: ComplexProfessionSeed[] = [
  seed('Border Protection (Preclearance or Portal Monitoring)', 'Federal Agent', 'Customs and Border Protection', 'Officers who man ports of entry, screen travelers and cargo, and hold the line against smugglers and traffickers in some of the most tense border environments in the country.', ['Alertness', 'Bureaucracy', 'HUMINT', 'Persuade'], 'Federal-agent tradecraft and border-inspection gear, with ready access to point-of-entry systems and manifests.', ['These officers are the visible last checkpoint before entry into the United States.', 'The role emphasizes high-volume interviews, document review, and reading intent under pressure.']),
  seed('Marine Interdiction', 'Federal Agent', 'CBP Air and Marine Operations', 'Boarding specialists who close with suspicious vessels from smaller craft and conduct interdiction actions at sea.', ['Alertness', 'Athletics', 'Search', 'SIGINT'], 'Federal-agent equipment plus water-survival gear and boarding tools.', ['Combines maritime boarding discipline, Spanish-language work, and close-quarters suspect control.'], {
    bonds: 2,
  }),
  seed('Detection Canine Program', 'Federal Agent', 'CBP Office of Field Operations', 'K9 officers and handlers who identify contraband, hidden people, explosives, narcotics, and other smuggled materials.', ['Alertness', 'Craft (Dog Training)', 'Science (Veterinary Science)', 'Search'], 'Federal-agent equipment, a working canine, dog-handling gear, and veterinary supplies.', ['Canine teams travel widely and are in constant demand across points of entry and supporting missions.'], {
    bonds: 2,
  }),
  seed('U.S. Border Patrol', 'Federal Agent', 'Customs and Border Protection', 'Hard-traveling interdiction and surveillance officers who operate out of vehicles and austere sites to identify crossings, patterns, and contraband routes.', ['Athletics', 'Drive', 'Navigate', 'Survival'], 'Federal-agent equipment and broad access to transport assets suitable for remote patrol work.', ['The role leans heavily on patience, field judgement, and reading terrain like a hunter.']),
  seed('Border Patrol Search, Trauma and Rescue Unit (BORSTAR)', 'Nurse or Paramedic', 'CBP Special Operations Group', 'Specialists who bring field medicine, trauma response, and technical search-and-rescue capability to dangerous remote operations.', ['Firearms', 'First Aid', 'Medicine', 'Survival'], 'Portable trauma supplies, extensive medical caches, and remote-rescue gear.', ['BORSTAR supports BORTAC and other federal teams in remote wilderness environments.'], {
    bonds: 2,
  }),
  seed('Border Patrol Tactical Unit (BORTAC)', 'Special Operator', 'CBP Special Operations Group', 'CBP’s self-sufficient tactical arm, built for mobile direct action in both urban and remote terrain, including crisis deployments and combat-zone work.', ['Firearms', 'Navigate', 'Search', 'Survival'], 'Special-operator gear adapted for austere tactical deployments and prolonged field operations.', ['BORTAC deploys worldwide at short notice and is designed to operate for days without support.'], {
    bonds: 2,
  }),
  seed('National Air Security Operations', 'Pilot or Sailor', 'CBP Air and Marine Operations', 'Operators of long-range patrol aircraft, surveillance planes, and unmanned systems that watch borders, maritime approaches, and smuggling corridors.', ['Alertness', 'SIGINT', 'Pilot (Airplane or Drone)', 'Craft (Electronics)'], 'Flight manuals, checklists, and access to patrol aircraft or drone-control spaces.', ['This role is the aviation and sensor-heavy counterpart to ground and maritime interdiction teams.']),
  seed('Tactical Canine Program', 'Federal Agent', 'ATF Special Response Teams', 'Handlers who pair with working dogs to track hidden or fleeing suspects and fight in close coordination with their animal partner.', ['Craft (Dog Training)', 'Melee Weapons', 'Search', 'Survival'], 'Federal-agent equipment, a working-breed canine, handling gear, and limited veterinary supplies.', ['Pairs canine tracking with close-quarters response and suspect apprehension.']),
  seed('Tactical Medic Program', 'Federal Agent', 'ATF Special Response Teams', 'Special agents who specialize in combat trauma care during high-risk warrant service and tactical operations.', ['Athletics', 'Demolitions', 'Firearms', 'HUMINT'], 'Federal-agent equipment plus extensive portable first-aid and trauma gear.', ['Balances trauma medicine with tactical law enforcement and mobility.'], {
    bonds: 1,
  }),
  seed('Office of Field Operations and Investigation', 'Federal Agent', 'Bureau of Alcohol, Tobacco, Firearms and Explosives', 'Case-building ATF investigators who chase illegal weapons dealers, traffickers, and explosive offenses into violent criminal ecosystems.', ['Criminology', 'Forensics', 'Firearms', 'Law'], 'Federal-agent equipment and ATF case access, labs, and tracing support.', ['This is the core ATF investigative track, defined by heavy caseloads and high-risk encounters.']),
  seed('Criminal Investigative Analyst', 'Intelligence Analyst', 'ATF', 'Behavioral and geographic profilers who model offender tendencies, motives, and likely target areas from scenes, evidence, and witness testimony.', ['Criminology', 'Forensics', 'Law', 'Psychotherapy'], 'Access to ATF and FBI data stores, behavioral-science research, and criminal-pattern files.', ['ATF is distinctive among federal agencies for using geographic profilers.']),
  seed('Tactical Operations', 'Special Operator', 'ATF Special Response Teams', 'High-risk ATF tactical operators built for violent warrant service, manhunts, and close support to investigations where initiative decides survival.', ['Alertness', 'Demolitions', 'Firearms', 'Search'], 'Tactical-entry gear, breaching tools, and standard SRT assault equipment.', ['Built for high-risk warrant service, manhunts, and rapid tactical response.']),
  seed('Explosives Specialist', 'Federal Agent', 'ATF Office of Enforcement Programs', 'Certified specialists in explosive materials, bomb-scene analysis, render-safe procedures, and how the commercial explosives industry really works.', ['Criminology', 'Demolitions', 'Forensics', 'Science (Chemistry or Physics)'], 'Federal-agent equipment, blast-protection gear, diagnostic tools, chemical and electronic testing gear, and remotely operated approaches for suspect devices.', ['Some specialists also qualify as Explosive Enforcement Officers for kinetic defusal support.'], {
    bonds: 1,
  }),
  seed('Protective Intelligence and Assessment Division', 'Intelligence Analyst', 'U.S. Secret Service', 'Analysts who fuse open-source and classified reporting into threat files focused on attacks against VIPs and other protected persons.', ['Computer Science', 'Criminology', 'HUMINT', 'SIGINT'], 'Classified reporting from across the intelligence community and threat-assessment support systems.', ['PID sits behind the visible protection mission, watching for patterns that suggest an attack is developing.']),
  seed('Counter Assault Team', 'Special Operator', 'U.S. Secret Service Special Operations Division', 'A uniquely defensive tactical team trained to suppress threats long enough to move the protectee out alive.', ['Alertness', 'Criminology', 'Firearms', 'Law'], 'High-end protective tactical gear, evacuation-focused weapons loadouts, and mission vehicles supporting VIP escape.', ['The role is not about winning a firefight in place; it is about breaking contact so the protectee survives.'], {
    bonds: 1,
  }),
  seed('Personal Protective Detail Division', 'Federal Agent', 'U.S. Secret Service', 'Bodyguards and site-control specialists assigned to the most visible and politically sensitive VIP protection missions in the U.S. government.', ['Athletics', 'First Aid', 'Military Science (Land)', 'Search'], 'Federal-agent equipment, low-visibility protective gear, and the logistics package needed for advance work and site control.', ['Blends bodyguard work, site control, and advance coordination.'], {
    bonds: 1,
  }),
  seed('Financial Administrative, Professional and Technical Support', 'Lawyer or Business Executive', 'U.S. Secret Service', 'The bureaucratic and technical backbone of the Secret Service financial-crimes mission, including accountants, analysts, and digital-forensics specialists.', ['Accounting', 'Computer Science', 'Criminology', 'SIGINT'], 'Broad access to financial-crimes reporting, digital evidence, and interagency investigative products.', ['APT specialists often perform much of the deep technical work that makes big USSS financial cases possible.']),
  seed('Search and Rescue Team', 'Firefighter', 'U.S. Coast Guard', 'Rescuers who confront brutal seas, bad weather, and failing machinery head-on to save lives at the edge of survivability.', ['Alertness', 'First Aid', 'Navigate', 'Swim'], 'Portable rescue gear, thermal and water-survival suits, and specialist maritime kits.', ['Centers on repair skills, meteorology, navigation, and rescue under extreme conditions.'], {
    bonds: 2,
  }),
  seed('Office of Response Policy (CG-5R)', 'Program Manager', 'U.S. Coast Guard', 'Counterterrorism planners and policy hands who build joint programs and coordinate Coast Guard participation in national-security response missions.', ['Accounting', 'Bureaucracy', 'Persuade', 'Military Science (Sea)'], 'Classified terrorism and military-operations files and an extensive Coast Guard/military contact network.', ['CG-5R is the policy-side bridge between Coast Guard assets and broader national-security missions.']),
  seed('Office of Investigations and Casualty Analysis', 'Anthropologist or Historian', 'U.S. Coast Guard Investigative Service', 'Analysts who build detailed casualty and death reviews from Coast Guard incidents, disasters, and complex operational failures.', ['Craft (Electrician or Mechanic)', 'Forensics', 'HUMINT', 'Search'], 'A deep physical and digital library of disaster, maritime, crash, flood, and storm history.', ['This profile is more analytical and historical than kinetic, but still closely tied to operational consequences.']),
  seed('Helicopter Interdiction Tactical Squadron (HITRON)', 'Pilot or Sailor', 'U.S. Coast Guard', 'Armed helicopter crews and sharpshooters trained to disable hostile boats during interdiction missions.', ['Alertness', 'Craft (Mechanic)', 'Firearms', 'Pilot (Helicopter)'], 'Specialized helicopter crew gear and a precision anti-vessel rifle package with advanced optics.', ['HITRON combines aviation, mechanical reliability, and precision shooting against moving marine targets.'], {
    bonds: 2,
  }),
  seed('Tactical Law Enforcement Team (TACLET)', 'Federal Agent', 'U.S. Coast Guard', 'Boarding and interdiction teams deployed on U.S. and allied naval vessels to stop smugglers, pirates, and other maritime law-enforcement targets.', ['Alertness', 'Firearms', 'Military Science (Sea)', 'Pilot (Boat)'], 'Federal-agent tools plus boat-survival gear and ship-boarding support equipment.', ['This is a maritime interdiction and armed-boarding role with a strong bilingual and HUMINT component.'], {
    bonds: 2,
  }),
  seed('Maritime Safety and Security Team (MSST)', 'Federal Agent', 'U.S. Coast Guard', 'Port-focused security teams built for high-threat interdiction, armed patrol, and protecting major maritime infrastructure.', ['Alertness', 'Forensics', 'HUMINT', 'Stealth'], 'Federal-agent equipment plus water-survival gear and armed patrol-boat support.', ['MSST sits between ordinary port security and the more elite maritime direct-action mission sets.'], {
    bonds: 1,
  }),
  seed('Maritime Security Response Team (MSRT)', 'Special Operator', 'U.S. Coast Guard', 'The Coast Guard’s maritime SWAT equivalent, centered on tactical boarding, ship seizure, and response to terrorists or hostage-takers afloat.', ['Alertness', 'Athletics', 'Firearms', 'Law'], 'Special-operator equipment plus maritime entry, restraint, and suspect-control tools.', ['Focused on tactical boarding and direct-action response against hostile maritime threats.'], {
    bonds: 1,
  }),
  seed('National Strike Force', 'Scientist', 'U.S. Coast Guard', 'Technical specialists who respond to oil discharges, hazardous-material releases, suspected WMD events, and other environmental disasters.', ['Bureaucracy', 'Science (Chemistry)', 'Science (Environmental)', 'Science (Meteorology)'], 'Environmental and chemical monitoring gear and technical response equipment.', ['NSF is the Coast Guard’s science-heavy emergency response profile.']),
  seed('Interagency Threat Assessment and Coordination Group', 'Intelligence Analyst', 'National Counterterrorism Center', 'Interagency analysts who try to move critical threat data across bureaucratic seams that rarely cooperate as smoothly as policy says they should.', ['Bureaucracy', 'Criminology', 'Foreign Language (choose one)', 'HUMINT'], 'Extensive NCTC intelligence holdings and badges to major partner headquarters.', ['Functions at the seam between intelligence analysis and operational coordination.']),
  seed('Joint Counterterrorism Assessment Team (JCAT)', 'Intelligence Analyst', 'National Counterterrorism Center', 'Prestige task-force staff who help set threat priorities and translate intelligence-community concern into operational focus.', ['Bureaucracy', 'Foreign Language (choose one)', 'HUMINT', 'Law'], 'NCTC reporting, interagency access, and broad terrorism-analysis holdings.', ['The source lists several valid profession families for JCAT; this import uses the analyst track for mechanics while preserving the broader options in the dossier.'], {
    professionText: 'Foreign Service Officer, Intelligence Analyst, Intelligence Case Officer, or Federal Agent.',
  }),
  seed('Near East Desk, Analysis', 'Intelligence Analyst', 'National Counterterrorism Center', 'Desk analysts focused on terrorist threats emerging from the Middle East and North Africa, synthesizing reporting into products other agencies can actually use.', ['Bureaucracy', 'Criminology', 'Foreign Language (Arabic, Berber, French, Kurdish, Persian, or Urdu)', 'History'], 'NCTC intelligence stores and access to partner-headquarters spaces.', ['These analysts are downstream from many agencies but must still turn scattered reporting into coherent warning.']),
  seed('Office of Foreign Naval Analysis, Nimitz Operational Center', 'Computer Scientist or Engineer', 'Office of Naval Intelligence', 'Technical analysts who scrutinize foreign ships, missiles, aircraft, and naval systems for capability, vulnerability, and likely operational effect.', ['Computer Science', 'Craft (Mechanic or Electrician)', 'Science (Chemistry, Physics, or Materials)', 'Military Science (Sea)'], 'Imagery from NGA and NRO plus technical schematics for naval and aerospace systems from around the world.', ['This role blends hard engineering interpretation with operational naval relevance.']),
  seed('Maritime Domain Awareness—PACOM', 'Intelligence Analyst', 'Office of Naval Intelligence', 'Analysts who track foreign naval assets across the Pacific and Indian Oceans and infer mission, payload, and intent from movement patterns.', ['Alertness', 'Foreign Language (Chinese, Hindi, or Russian)', 'Military Science (Sea)', 'Search'], 'Fresh ship-tracking intelligence from human and overhead sources, including NRO and NGA products.', ['ONI uses this work to keep the fleet ahead of rival powers and hidden deployments.']),
  seed('Cryptoanalysis Unit, Operations Directorate', 'Computer Scientist or Engineer', 'National Security Agency', 'Technical specialists who design algorithms to break foreign encryption and turn protected signals into readable intelligence.', ['Computer Science', 'Craft (Microelectronics)', 'Science (Mathematics)', 'SIGINT'], 'Deep technical libraries in mathematics, computing, and adjacent hard sciences.', ['Emphasizes codebreaking, analytics, engineering, and language support.'], {
    bonds: 3,
  }),
  seed('Tailored Access Operations Unit (TAO)', 'Computer Scientist or Engineer', 'National Security Agency', 'Cyber-espionage operators who penetrate foreign systems, recover data, and build access paths others can exploit later.', ['Bureaucracy', 'Computer Science', 'Foreign Language', 'SIGINT'], 'Hacking tradecraft, disguise material, recovery hardware, and technical manuals for implanted or recovered surveillance systems.', ['Focuses on intrusion tradecraft, persistence, and recovering data from foreign systems.'], {
    bonds: 2,
  }),
  seed('Remote Device Activities Unit', 'Computer Scientist or Engineer', 'National Security Agency', 'Field-capable surveillance specialists who install clandestine collection devices and retrieve intelligence gathered from remote systems.', ['Alertness', 'Craft (Electrician)', 'Craft (Locksmithing)', 'Disguise'], 'Clandestine technical gear for entry, installation, and recovery of remote-surveillance packages.', ['Centers on clandestine installation, technical entry, and remote collection recovery.']),
  seed('Counterintelligence Investigator, Q Directorate', 'Federal Agent', 'National Security Agency', 'Internal investigators who examine security risks, suspicious activity, and vulnerabilities across NSA personnel, contractors, and partner networks.', ['Computer Science', 'Foreign Language', 'SIGINT', 'Stealth'], 'Federal-agent tools plus internal security access to NSA personnel, contractor, and briefings systems.', ['This role sits at the intersection of insider-threat work, security education, and sensitive internal investigations.']),
  seed('Defense Clandestine Service', 'Intelligence Case Officer', 'Defense Intelligence Agency', 'Overseas clandestine operators who gather intelligence on foreign militaries and work in close partnership with SOCOM and other sensitive operators.', ['Bureaucracy', 'Foreign Language', 'HUMINT', 'Military Science (choose one)'], 'Special-operator style field gear concealed within a cover-friendly clandestine package.', ['DCS officers train alongside CIA personnel and are expected to stay effective around kinetic missions.']),
  seed('Directorate for Analysis, Americas Division', 'Intelligence Analyst', 'Defense Intelligence Agency', 'Regional analysts focused on the militaries of Central and South America and the Caribbean, especially as their capabilities affect U.S. interests nearby.', ['History', 'Foreign Language', 'HUMINT', 'Military Science (choose one)'], 'Classified military reporting and a strong library of biographies, geography, and regional military history.', ['Keeps a close eye on the region because proximity makes U.S. interests part of the picture.']),
  seed('Defense Attaché', 'Soldier or Marine', 'Defense Intelligence Agency', 'Embassy-based military representatives who gather intelligence, recruit sources, liaise with host militaries, and represent the U.S. uniformed services abroad.', ['Bureaucracy', 'Foreign Language', 'HUMINT', 'Law'], 'Embassy access, an armored SUV and driver, and diplomatic credentials.', ['The book positions this as a do-everything overseas military-intelligence representative role.']),
  seed('InnoVision Directorate', 'Computer Scientist or Engineer', 'National Geospatial-Intelligence Agency', 'Researchers who explore new predictive and expert systems for gathering, processing, and exploiting geospatial intelligence.', ['Bureaucracy', 'Craft (Engineering or Microengineering)', 'SIGINT', 'Science (Chemistry, Geology, or Physics)'], 'Access to a program budget and experimental R&D channels.', ['The source allows either scientist or computer-science lineage; this import uses the engineering track mechanically.']),
  seed('Analysis Directorate', 'Intelligence Analyst', 'National Geospatial-Intelligence Agency', 'Analysts who turn imagery and geospatial data into detailed predictive reporting and decision-ready assessments.', ['Accounting', 'Bureaucracy', 'SIGINT', 'Science (Cartography or Mathematics)'], 'A specialist library of modeling, statistics, quantum mechanics, and game-theory material.', ['This is the core analytic reporting arm behind NGA’s geospatial products.']),
  seed('Imagery Intelligence Systems Directorate', 'Intelligence Analyst', 'National Reconnaissance Office', 'Visual-analysis and systems-improvement specialists who make satellite and drone imagery more useful, more readable, and more operationally decisive.', ['Art (Drafting or Mapmaking)', 'Computer Science', 'Science (Engineering or Geography)', 'SIGINT'], 'Classified map and photographic records stretching back decades.', ['The role sits at the heart of turning raw overhead collection into something humans can use.']),
  seed('Advanced Systems and Technology Directorate', 'Scientist', 'National Reconnaissance Office', 'R&D staff pushing exotic sensing and communications technologies into practical remote-intelligence collection programs.', ['Art (Graphic Design)', 'Bureaucracy', 'Computer Science', 'Science (Chemistry, Physics, or Geology)'], 'Standing access to universities, think tanks, and corporate labs doing relevant advanced work.', ['AS&T is explicitly open to unconventional ideas, wherever they originate.']),
  seed('Park Ranger', 'Police Officer', 'National Park Service', 'Generalist rangers who stand on the front line of park law enforcement, visitor safety, and practical protection of immense and often isolated terrain.', ['Athletics', 'Navigate', 'Science (Ecology)', 'Survival'], 'Federal-agent style field gear suitable for extended park and wilderness work.', ['The role is a true jack-of-all-trades law-enforcement profile in austere settings.']),
  seed('Biological Resources Division', 'Scientist', 'National Park Service', 'Scientists and ecologists who preserve park ecosystems and advise on practical methods of protecting natural and historical resources.', ['History', 'Law', 'Search', 'Survival'], 'Scientific field gear matched to specialty plus camping and backcountry equipment.', ['Supports both scientific stewardship and policy advice for protected resources.']),
  seed('Wildland Fire Division', 'Firefighter', 'National Park Service', 'NPS fire-management personnel ranging from hand crews to elite hotshots, fighting some of the largest and ugliest fires in the world.', ['Athletics', 'First Aid', 'Survival', 'Swim'], 'Rugged wildfire PPE, tools, pumps, shelters, ropes, radios, and personal medical kits.', ['Demands long deployments, extreme conditions, and close teamwork.']),
  seed('Interpretive Ranger', 'Anthropologist or Historian', 'National Park Service', 'Public-facing rangers who educate visitors while also protecting sites, history, and the people moving through them.', ['Firearms', 'First Aid', 'Medicine', 'Survival'], 'Uniform, badge, camping tools, and a practical library on site history, ecology, and survival.', ['Combines public education, site protection, and broad field competence.'], {
    bonds: 2,
  }),
  seed('Investigative Services Branch', 'Federal Agent', 'National Park Service', 'Protection rangers with extra training to investigate crimes in remote, under-resourced, and logistically miserable environments.', ['Athletics', 'Navigate', 'Stealth', 'Survival'], 'Federal-agent equipment adapted for backcountry crime scenes and self-supported investigative work.', ['ISB agents often carry their own gear through wilderness at night, in bad weather, with little backup.']),
  seed('Federal Archeology Program', 'Anthropologist or Historian', 'National Park Service', 'Federal archaeologists who identify, preserve, restore, and interpret historically significant sites and artifacts.', ['Archeology', 'Navigate', 'Search', 'Survival'], 'Aging books, field notebooks, and camping gear.', ['This profile is explicitly grounded in recovery, preservation, and interpretation of national heritage.']),
  seed('Urban Search and Rescue', 'Firefighter', 'Federal Emergency Management Agency', 'Rescuers focused on finding, extricating, and medically stabilizing trapped victims in collapse, trench, mine, and transportation disasters.', ['Alertness', 'First Aid', 'Search', 'Survival'], 'Extensive portable and airliftable search-and-rescue equipment.', ['US&R is one of FEMA’s most direct and physically demanding operational tracks.']),
  seed('Office of Mitigation Insurance', 'Program Manager', 'Federal Emergency Management Agency', 'Mitigation specialists who build financial and planning capacity so communities can prepare for, survive, and recover from disasters.', ['Bureaucracy', 'Craft (Architecture)', 'Science (Meteorology or Statistics)', 'Survival'], 'Control of a project budget and access to program data and disaster-mitigation research.', ['This role is more quietly strategic than field-forward, but it shapes how communities weather catastrophe.']),
  seed('National Disaster Medical System Rapid Deployment Force', 'Nurse or Paramedic', 'Federal Emergency Management Agency', 'Field medical personnel expected to be among the earliest responders once a disaster is declared.', ['First Aid', 'HUMINT', 'Psychotherapy', 'Survival'], 'Portable, airliftable medical supplies and survival gear.', ['Works at the front edge of disaster medicine and rapid deployment.']),
  seed('Kennedy Emergency Response Team', 'Special Operator', 'NASA', 'NASA’s SWAT-equivalent security arm at Kennedy Space Center, trained for vertical insertion, crowd control, facility defense, and VIP protection.', ['Athletics', 'Alertness', 'Dodge', 'Firearms'], 'Special-operator tradecraft and the specialized tactical kit required for launch infrastructure and volatile compounds.', ['ERT works in environments where ordinary tactical errors can trigger catastrophic secondary consequences.']),
  seed('Space Communications and Navigation', 'Scientist', 'NASA', 'Operators and analysts who manage NASA’s communication architecture across deep-space, near-earth, and space-network systems.', ['Bureaucracy', 'Computer Science', 'Science (Astronomy, Chemistry, Engineering, Geology, Mathematics, or Physics)', 'SIGINT'], 'A substantial library and access to astronomical data and related research.', ['SCaN is the connective tissue that keeps NASA missions in communication.']),
  seed('Flight Research, Test, and Engineering Directorate', 'Scientist', 'NASA Armstrong Flight Research Center', 'Aeronautical engineers and systems professionals who build and test experimental and next-generation flight systems.', ['Bureaucracy', 'Craft (Engineering)', 'Craft (Mechanic)', 'Science (Aeronautics)'], 'Engineering trade tools and direct access to aeronautical research programs.', ['Uses test programs, engineering, and field research to evaluate next-generation systems.']),
  seed('Astronaut Corps Pilot', 'Pilot or Sailor', 'NASA', 'An elite astronaut-pilot profile built for spacecraft, remote systems, and high-stakes mission execution where failure is spectacular and unforgiving.', ['Heavy Machinery', 'Science (Biology)', 'Science (Mathematics)', 'Science (Meteorology)'], 'Hardened tools, launch-site and training-facility access, and mission-specific technical support.', ['An elite selection track centered on flight, navigation, physics, and spacecraft operation.'], {
    bonds: 2,
  }),
  seed('Project Orion Management', 'Program Manager', 'NASA', 'Managers overseeing the design, development, and testing of Orion spacecraft and the program structure needed to move it forward.', ['Accounting', 'Bureaucracy', 'Craft (Engineering)', 'Science (Physics)'], 'Control of a project budget and the leverage that comes with it.', ['Orion management is about turning a huge, failure-intolerant technical effort into something that can actually ship.']),
  seed('Tactical Technologies Office', 'Program Manager', 'DARPA', 'Program leaders pushing the edge of military vehicles, weapons, body armor, exoskeletons, lasers, and other disruptive tactical technologies.', ['Accounting', 'Bureaucracy', 'Science (Engineering)', 'Science (choose one)'], 'Budgetary control and one buggy, impractical, potentially transformative technology or codebase.', ['TTO is where DARPA funds things other organizations are not brave enough to touch yet.']),
  seed('Microsystems Technology Office', 'Program Manager', 'DARPA', 'Program staff exploring practical applications for advanced microelectronics, exotic power sources, and discoveries adjacent to quantum-scale engineering.', ['Bureaucracy', 'Computer Science', 'Science (Mathematics)', 'Science (Physics)'], 'Program budget control and one fragile concept machine or prototype.', ['Focuses on practical applications for microelectronics, exotic power sources, and quantum-adjacent engineering.']),
  seed('SME Technology Contractor', 'Computer Scientist or Engineer', 'DARPA', 'Private-sector subject-matter experts brought in to support DARPA programs with technical depth and less restricted travel and procurement.', ['Bureaucracy', 'Computer Science', 'Craft (choose one)', 'Science (choose one)'], 'Private-company resources, up to unusual expense without review, and a relatively flexible travel budget.', ['This is the contractor-facing side of DARPA’s experimental ecosystem.']),
  seed('Office of Secure Transportation Courier Program', 'Special Operator', 'National Nuclear Security Administration', 'Armed courier agents who escort nuclear materials and are trained to prevent anyone from taking control of the shipment, no matter what.', ['Alertness', 'Drive', 'HUMINT', 'Law'], 'Special-operator gear, radiological and chemical PPE, and access to hardened transport vehicles.', ['Convoy work is no-nonsense, fast-moving, and ready to escalate to deadly force immediately.']),
  seed('NEST Search Group', 'Scientist', 'National Nuclear Security Administration', 'Scientists and medical professionals called to search for suspected nuclear threat devices in the field.', ['Alertness', 'Computer Science', 'Science (Chemistry or Physics)', 'SIGINT'], 'Radiological protective gear and advanced portable detection and surveillance gear.', ['The source explicitly allows scientist or physician backgrounds; this import uses the scientist chassis while preserving that note in the dossier.']),
  seed('Joint Technical Operations Team', 'Firefighter', 'National Nuclear Security Administration', 'Technical teams that evaluate and neutralize suspected nuclear or radiological devices once located.', ['Alertness', 'Craft (Electronics)', 'Demolitions', 'Science (Nuclear Physics)'], 'Explosives-disposal gear, body armor, and remote-operated robots tied to demolitions work.', ['JTOT works closely with the FBI and EOD specialists during render-safe operations.']),
  seed('Criminal Investigation Division', 'Federal Agent', 'Internal Revenue Service', 'IRS law-enforcement agents who turn financial data, forensic accounting, and digital evidence into high-conviction federal cases.', ['Accounting', 'Computer Science', 'Science (Mathematics)', 'SIGINT'], 'Federal-agent tradecraft plus a tax-law library and extraordinary latitude to access tax records.', ['CI is one of the most feared and respected federal investigative tracks because every criminal scheme leaves a tax trail.']),
  seed('Office of Professional Responsibility', 'Lawyer or Business Executive', 'Internal Revenue Service', 'Standards and misconduct specialists who support investigations into tax practitioners who violate the law or professional obligations.', ['Accounting', 'Computer Science', 'Forensics', 'Law'], 'A substantial physical and electronic tax-law library plus historical corporate and personal returns.', ['OPR is an investigative support profile grounded in legal and financial process knowledge.']),
  seed('Mobile Security Team', 'Special Operator', 'Constellis', 'Hand-picked private-sector responders who deploy into kidnapping, extortion, evacuation, piracy, and high-threat client-protection crises.', ['Computer Science', 'HUMINT', 'Persuade', 'Search'], 'Special-operator equipment for private contracting deployments and emergency response.', ['The role emphasizes professionalism, composure, and client-facing judgment as much as violence.']),
  seed('Tactical Roleplayer', 'Soldier or Marine', 'Constellis', 'Opposition-force trainers who simulate hostile actors in realistic field exercises and high-threat training scenarios.', ['Disguise', 'HUMINT', 'Persuade', 'Stealth'], 'Regional clothing, a sidearm, and rendered-safe or training-only firearms.', ['The role is about believable behavior under pressure, not just range theatrics.']),
  seed('Defensive Designated Marksman', 'Special Operator', 'Constellis', 'Mercenary precision shooters tasked with covering the team and the client in unstable and openly hostile environments.', ['Alertness', 'Craft (Gunsmith)', 'Firearms', 'Search'], 'SWAT-style kit and a sniper rifle with a full suite of precision and low-light sighting systems.', ['This is a contractor marksman profile optimized for overwatch and client survival.']),
  seed('Protective Security Specialist', 'Police Officer', 'Constellis', 'Bodyguards who stay glued to the client and measure success entirely by the principal getting out alive.', ['Alertness', 'First Aid', 'Foreign Language', 'Stealth'], 'Low-visibility firearms, concealable carbines, and briefcase-deployable protection weapons.', ['The role prioritizes client survival over the operator’s own safety.']),
  seed('Paramedic (P-PSS)', 'Nurse or Paramedic', 'Constellis', 'Medical specialists embedded with protective security teams to stabilize injuries and manage client medical issues during hostile travel.', ['Firearms', 'Melee Weapons', 'Search', 'Unarmed Combat'], 'SWAT-style kit plus watertight portable medical and triage equipment.', ['This role lives beside close protection, not behind it.']),
  seed('All-source Socio-cultural Analyst', 'Media Specialist', 'Constellis', 'Regional and cultural specialists who help clients understand local social, political, and economic currents before those currents turn lethal.', ['Bureaucracy', 'Computer Science', 'Foreign Language (choose one)', 'Law'], 'An electronic library of journals, books, and current material for the region of expertise.', ['The role turns broad cultural fluency into practical risk understanding.']),
  seed('Senior Research Scientist—Robotics & Autonomy', 'Computer Scientist or Engineer', 'Lockheed Martin', 'Researchers in advanced autonomy and artificial intelligence pushing at the edges of what machine systems can perceive and decide.', ['Anthropology', 'Science (Biology)', 'Science (Logic)', 'Science (Physics)'], 'A vast interdisciplinary digital library and advanced neural-network-connected computing resources.', ['Explores advanced autonomy and machine decision-making in Lockheed’s research environment.']),
  seed('Engineer / Advanced Programs', 'Computer Scientist or Engineer', 'Lockheed Martin Skunk Works', 'Engineers on disruptive, next-generation, highly classified aerospace projects where unorthodox thinking is part of the job description.', ['Heavy Machinery', 'Military Science (Air)', 'Pilot (Aircraft)', 'Science (Materials)'], 'A strong engineering and materials-science library and access to highly sensitive program spaces.', ['The book frames this as a Skunk Works role steeped in military culture and hard security.']),
  seed('Test Pilot / Advanced Programs', 'Pilot or Sailor', 'Lockheed Martin Skunk Works', 'Test pilots flying classified airframes under intense scrutiny, collecting data no one else in the world gets to see.', ['Computer Science', 'Heavy Machinery', 'Pilot (Aircraft)', 'Science (Physics)'], 'Technical manuals, huge stores of test data, and classified performance material for the assigned airframe.', ['You may fly something extraordinary, but the program owns it, not you.']),
  seed('Systems Risk Analyst', 'Program Manager', 'Lockheed Martin', 'Analysts who map physical, cyber, and financial risk to projects and facilities, with a sharp eye toward espionage and access control.', ['Alertness', 'Criminology', 'SIGINT', 'Stealth'], 'Access across the program stack, from server logs to janitorial closets and badge-use records.', ['This is a security and governance role with unusually broad visibility into a program.']),
  seed('Space Operations', 'Computer Scientist or Engineer', 'Lockheed Martin', 'Control-room staff who monitor satellites and rocket programs while modeling trajectories, systems behavior, and operational trends.', ['Navigate', 'Science (Astrophysics)', 'Science (Mathematics)', 'Science (Statistics)'], 'Modeling software, electrical-engineering references, control-room access, and the output of the relevant satellite program.', ['This profile sits where orbital data, predictive models, and classified mission operations intersect.']),
  seed('Targeting Officer', 'Intelligence Analyst', 'CACI / Booz Allen Hamilton', 'Targeters who identify the people, relationships, and organizations inside arms trafficking, drug networks, terrorism, cyber threats, and counterintelligence problems.', ['Bureaucracy', 'History', 'Law', 'Search'], 'Access to classified high-value-target analyses and huge volumes of surveillance data.', ['Analyzes relationships and organizations across multiple threat networks.'], {
    bonds: 3,
  }),
  seed('Contracting Signals Analyst', 'Computer Scientist or Engineer', 'CACI / Booz Allen Hamilton', 'Signals specialists who decrypt, interpret, and explain intercepted communications so decision-makers understand both content and implication.', ['Art (Writing)', 'Bureaucracy', 'Foreign Language', 'HUMINT'], 'Classified data for the current program and, often, archival access from earlier contracts.', ['These analysts often live inside NSA-facing work even when they do not wear an agency badge.']),
  seed('Digital Forensics Analyst', 'Computer Scientist or Engineer', 'CACI / Booz Allen Hamilton', 'Technical forensics staff who recover, trace, and interpret hidden, lost, or deliberately destroyed digital evidence.', ['Accounting', 'Forensics', 'HUMINT', 'Science (Statistics)'], 'A wide range of intrusion-analysis, recovery, and tracing software.', ['This is the contractor expression of a very in-demand investigative specialty.']),
  seed('Counterintelligence Interrogator', 'Foreign Service Officer', 'CACI / Booz Allen Hamilton', 'Former military intelligence personnel who question detainees, package what they learn, and rarely match their reputation for brutality.', ['Firearms', 'HUMINT', 'Persuade', 'Pharmacy'], 'Behavioral-analysis libraries and pharmaceuticals or medicines used to support questioning.', ['The role is most often contracted to the FBI, CIA, or DIA.']),
  seed('Army Fellow Visiting Analyst', 'Intelligence Analyst', 'RAND Corporation', 'Active-duty Army officers brought into RAND research programs to supply practical expertise about how the Army really operates.', ['Bureaucracy', 'Military Science (Land)', 'Navigate', 'Science (Ballistics)'], 'Libraries on tactics, strategy, and the engineering analysis of military hardware.', ['This role is a bridge between abstract policy work and lived military reality.']),
  seed('Drug Policy Researcher', 'Scientist', 'RAND Corporation', 'Researchers studying drugs and alcohol to inform policy with evidence rather than rhetoric.', ['Criminology', 'Law', 'Science (Mathematics)', 'Pharmacy'], 'Research libraries, policy data, and strong professional networks in both law-enforcement and pharmaceutical worlds.', ['Uses evidence-based research to inform policy and public-health decisions.']),
  seed('Project Air Force Researcher', 'Scientist', 'RAND Corporation', 'Analysts who evaluate Air Force weapons, technology, and force application to anticipate the shape of future threats.', ['Bureaucracy', 'Craft (Mechanic or Microelectronics)', 'Military Science (Air)', 'SIGINT'], 'Technical manuals and journals covering physics, materials, electronics, and the current project domain.', ['This is a science-forward defense-analysis role rather than an operator track.']),
  seed('R&D Theoretical Mathematician', 'Scientist', 'RAND Corporation', 'Theoretical mathematicians who build abstract models, prove theorems, and identify subtle patterns in complex systems and data.', ['Bureaucracy', 'History', 'Science (Systems Theory)', 'Science (Quantum Theory)'], 'Mathematics and quantum-physics libraries plus modeling software suites.', ['RAND explicitly wants unconventional thinkers, and this role embodies that.']),
];

const buildLongDescription = (entry: ComplexProfessionSeed): string => {
  const dossier = ORGANIZATION_DOSSIERS[entry.organization] ?? ORGANIZATION_DOSSIERS.Default;
  const skillLine = joinHumanList(entry.bonusSkills);
  const lines = [
    `## ${entry.name}`,
    '',
    `**Organization:** ${entry.organization}`,
    '',
    `**Organization Overview:** ${dossier.overview}`,
    '',
    `**Role Summary:** ${entry.description}`,
    '',
    `**How the Role Works:** This role emphasizes ${skillLine}. In practice, it combines the specific duties of ${entry.name.toLowerCase()} with the operating patterns of ${entry.organization.toLowerCase()}.`,
    '',
    `**Agency Reality:** ${dossier.operations}`,
    '',
    `**Friction and Pressure:** ${dossier.friction}`,
    '',
    `**Working Culture:** ${dossier.culture}`,
    '',
    `**Profession Basis:** ${entry.professionText ?? entry.baseProfession}.`,
    '',
    `**Suggested Bonus Skills:** ${entry.bonusSkills.join(', ')}.`,
    '',
    `**Equipment and Access:** ${entry.equipment}`,
  ];

  if (entry.bonds !== undefined) {
    lines.push('', `**Starting Bonds:** ${entry.bonds}.`);
  }

  if (entry.professionalSkills && entry.professionalSkills.length > 0) {
    lines.push('', '**Professional Skills:**');
    for (const skill of entry.professionalSkills) {
      lines.push(`- ${skill}`);
    }
  }

  if (entry.notes.length > 0) {
    lines.push('', '**Operational Notes:**');
    for (const note of entry.notes) {
      lines.push(`- ${note}`);
    }
  }

  return lines.join('\n');
};

export const COMPLEX_PROFESSION_INFORMATION: Record<string, { short: string; long: string }> =
  Object.fromEntries(
    COMPLEX_PROFESSION_SEEDS.map((entry) => [
      makeInfoId(entry.name),
      {
        short: `${entry.organization}: ${entry.description}`,
        long: buildLongDescription(entry),
      },
    ])
  );

export function buildComplexProfessions(baseProfessions: Profession[]): Profession[] {
  const baseByName = new Map(baseProfessions.map((profession) => [profession.name, profession]));

  return COMPLEX_PROFESSION_SEEDS.map((entry) => {
    const baseName = BASE_PROFESSION_ALIASES[entry.baseProfession] ?? entry.baseProfession;
    const baseProfession = baseByName.get(baseName);

    if (!baseProfession) {
      throw new Error(`Base profession not found for Complex role "${entry.name}": ${entry.baseProfession}`);
    }

    return {
      ...baseProfession,
      name: entry.name,
      description: entry.description,
      infoId: makeInfoId(entry.name),
      source: 'The Complex',
      page: entry.page,
      professionalSkills: entry.professionalSkills ?? baseProfession.professionalSkills,
      choiceGroups: entry.choiceGroups ?? baseProfession.choiceGroups,
      bonds: entry.bonds ?? baseProfession.bonds,
      bonusSkillAdvancements: entry.bonusSkillAdvancements ?? baseProfession.bonusSkillAdvancements,
      equipmentKit: entry.equipmentKit ?? baseProfession.equipmentKit,
      specialTrainings: entry.specialTrainings ?? baseProfession.specialTrainings,
      isDepartment: false,
      eligibleProfessions: undefined,
    };
  });
}
