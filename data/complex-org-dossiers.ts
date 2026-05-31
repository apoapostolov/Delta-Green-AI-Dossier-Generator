export interface OrganizationDossier {
  overview: string;
  operations: string;
  friction: string;
  culture: string;
}

export const ORGANIZATION_DOSSIERS: Record<string, OrganizationDossier> = {
  'Customs and Border Protection': {
    overview: 'CBP is the federal service that meets the country at the border. It combines inspection, interdiction, surveillance, and special operations into one sprawling mission that has to protect entry points without choking off legitimate movement.',
    operations: 'Its personnel screen travelers, cargo, vehicles, and vessels while using dogs, drones, sensors, and mobile response units to catch smugglers, illegal entrants, and hidden threats before they can disappear into the interior.',
    friction: 'CBP sits in the middle of immigration politics, trade disputes, and constant scrutiny over how it treats travelers and migrants. It also has to cooperate with a lot of partners who want the same targets and the same data.',
    culture: 'The best CBP people think like gatekeepers and trackers at the same time. They have to be patient, observant, and comfortable making fast judgment calls in public view.',
  },
  'CBP Air and Marine Operations': {
    overview: 'AMO extends CBP into the air and across the water. It exists because the border is too large to watch from the ground alone.',
    operations: 'Aircraft, boats, drones, and surveillance systems let AMO support the rest of CBP by finding, shadowing, and interrupting suspicious movement in places where roads and checkpoints do not help much.',
    friction: 'AMO has to coordinate closely with the rest of CBP and with outside partners, which means its technical work is only useful if the information is shared quickly and correctly.',
    culture: 'The culture rewards calm operators who like machines, maps, and moving targets. People here need to be comfortable with autonomy and with a mission that changes by the hour.',
  },
  'CBP Office of Field Operations': {
    overview: 'OFO runs the formal points of entry. Airports, land crossings, and ports all depend on it to decide who and what gets in, what gets searched, and what gets turned away.',
    operations: 'OFO work is built around interviews, manifests, document checks, and the ability to spot the one traveler or shipment that does not belong. It is high-volume, public-facing, and often repetitive right up until it suddenly is not.',
    friction: 'OFO sits at the front line of border politics and has to cooperate with many agencies that share its border-adjacent responsibilities. That makes the work useful but very visible.',
    culture: 'Good OFO personnel are steady, courteous, and difficult to rattle. They tend to read people quickly and trust the details that other people ignore.',
  },
  'CBP Special Operations Group': {
    overview: 'SOG is CBP’s high-end tactical and rescue layer. It exists to deal with the days when the border mission becomes a crisis.',
    operations: 'BORTAC, BORSTAR, intelligence support, and logistics all fit inside SOG. The group can move from rescue to entry to direct action without waiting for someone else to solve the problem.',
    friction: 'SOG is useful because it can respond quickly, but that also means its missions are high visibility and frequently expensive. The unit has to stay sharp under pressure from both operations and oversight.',
    culture: 'The culture is practical and self-reliant. SOG personnel are expected to think for themselves, keep their gear ready, and work well without a lot of outside help.',
  },
  'Bureau of Alcohol, Tobacco, Firearms and Explosives': {
    overview: 'ATF is a compact agency with a violent mandate. It focuses on firearms, explosives, arson, and the criminal systems that grow up around them.',
    operations: 'Its case agents rely on tracing data, labs, ballistics, interviews, and aggressive field work. Special response teams, canine handlers, and explosives specialists give ATF more tactical reach than its size suggests.',
    friction: 'ATF is always trying to do more work than its staffing and budget really support. It also gets dragged into jurisdictional fights and political arguments over guns more than almost any other federal agency.',
    culture: 'ATF culture is terse, fast, and built around results. People here tend to value efficiency, toughness, and a short distance between the paperwork and the street.',
  },
  'ATF Special Response Teams': {
    overview: 'SRTs are ATF’s tactical arm. They exist to keep dangerous investigations moving when a suspect, scene, or warrant turns too hot for ordinary agents.',
    operations: 'These teams handle entries, fugitive operations, long-range surveillance, canine support, medics, and specialized explosive-response work. They are the agency’s answer to the problem of violent resistance.',
    friction: 'Because SRT missions often overlap with other agencies and with political sensitivities, they get judged hard for both pace and outcomes. Nobody expects them to be quiet, but everyone expects them to be precise.',
    culture: 'The culture is blunt and mission-first. If you are in SRT, you are expected to be competent, direct, and able to work under stress without needing a lot of hand-holding.',
  },
  'ATF Office of Enforcement Programs': {
    overview: 'This side of ATF handles explosives enforcement and the technical programs that support it. It is where the agency’s more specialized bomb, arson, and compliance work lives.',
    operations: 'Explosive specialists, render-safe teams, and detection assets all come through here. The mission is both investigative and technical, which means the office has to know the industry as well as the crime scene.',
    friction: 'The office lives under intense public attention because explosives cases tend to become headlines quickly. It also has to be correct the first time, because mistakes are measured in damage, not just paperwork.',
    culture: 'The culture rewards careful hands, technical fluency, and the ability to stay calm around dangerous material. People here are expected to be deliberate without becoming slow.',
  },
  'ATF Office of Field Operations and Investigation': {
    overview: 'This is the core case-building engine of ATF. It focuses on illegal weapons dealers, smugglers, and the violent criminal networks that keep those markets alive.',
    operations: 'Agents use tracing, surveillance, informants, forensics, and field interviews to turn violent crime into prosecutable cases. Every lead can become a larger network if the office has the stamina to follow it.',
    friction: 'The office is always competing for jurisdiction and attention, both with other agencies and with the politics surrounding firearms enforcement. That makes speed and clarity especially important.',
    culture: 'The culture is aggressive in the best investigative sense. People here have to move from evidence to action without getting lost in the pile of data.',
  },
  'U.S. Secret Service': {
    overview: 'The Secret Service combines close protection and financial crime. Those missions seem unrelated until you realize both require paranoia, discipline, and a talent for spotting what does not fit.',
    operations: 'Protective details depend on advance work, surveillance, site control, and a constant search for vulnerabilities. The investigative side uses task forces, digital forensics, and financial records to chase fraud, identity crime, and counterfeiting.',
    friction: 'The Service depends on local law enforcement and other federal partners, but it is rarely happy to give up control. That makes it powerful, effective, and occasionally unpopular in the same breath.',
    culture: 'The culture values caution, silence, and the instinct to notice danger before it has a name. The job looks glamorous from a distance and methodical up close.',
  },
  'U.S. Secret Service Special Operations Division': {
    overview: 'The Special Operations Division holds the Secret Service’s specialized protective tools. It is where CAT, counter-sniper, canine, emergency response, and similar elements come together.',
    operations: 'The division handles the problems that standard protection cannot. Its people are trained to move fast when a detail is threatened and to solve the worst part of a protective emergency before the crowd even understands what happened.',
    friction: 'High visibility means high consequences. Every error can become public, political, and personal at the same time.',
    culture: 'The culture is formal, disciplined, and very aware of presentation. Even when the division is moving hard, it is expected to look controlled.',
  },
  'U.S. Coast Guard': {
    overview: 'The Coast Guard is both military service and law-enforcement agency, and that dual identity shapes everything it does. It patrols waterways, responds to disasters, and enforces maritime law while still remaining part of the armed forces.',
    operations: 'Its work includes search and rescue, vessel interdiction, port security, environmental response, and maintenance of the systems that let maritime traffic move safely. Boats, cutters, helicopters, and coastal stations are all part of the same mission picture.',
    friction: 'The service has to coordinate with the Navy, CBP, DEA, EPA, and a lot of other partners, often while underfunded relative to the scale of the coastline it has to cover. It is respected, but it is also expected to solve impossible problems quickly.',
    culture: 'The culture is responsibility-heavy and practical. Coast Guard personnel are usually proud of getting hard work done in bad conditions with a small team and a lot of trust.',
  },
  'National Counterterrorism Center': {
    overview: 'NCTC exists to fuse terrorism intelligence from the whole government into something usable. It is a warning and coordination hub more than a traditional field agency.',
    operations: 'Its analysts and task groups sort, validate, and share intelligence across agencies that would rather not share it as much as they are supposed to. Most of the mission is desks, databases, and the bureaucratic labor of making intelligence move.',
    friction: 'NCTC has a lot of responsibility but not much authority. That mismatch means it spends a huge amount of effort convincing others to act on its products.',
    culture: 'The culture is analytic, interagency, and often a little impatient. Good NCTC people can translate between institutions without losing the signal in the noise.',
  },
  'Office of Naval Intelligence': {
    overview: 'ONI provides maritime intelligence for the Navy and for national decision-makers. It watches fleets, submarines, maritime routes, and the technical details that decide whether a ship matters.',
    operations: 'Most of the work is analysis, but the agency also sends people to embassies, commands, and remote sites when a real-world check or interview is needed. Its regional maritime awareness work is as important as its technical analysis.',
    friction: 'ONI is respected but still competes with other military intelligence communities that do not always share freely. It has to stay useful without becoming invisible.',
    culture: 'The culture is technical, naval, and detail-oriented. It suits people who like pattern recognition, technical reporting, and the sense that the next war may already be visible from the waterline.',
  },
  'National Security Agency': {
    overview: 'The NSA is the government’s signals intelligence giant. It lives where codebreaking, cyber collection, communications security, and mass data processing meet.',
    operations: 'Its people work in SCIFs, on secure systems, and with networks that are designed to be both protected and watched. Some travel happens, but most of the agency’s power comes from technical depth and relentless analytic discipline.',
    friction: 'The NSA has to operate under constant scrutiny from Congress, the public, and other agencies. It collects almost everything, but it can only safely use a fraction of what it sees.',
    culture: 'The culture is secretive, technical, and intensely intelligent. It rewards people who can think deeply, keep quiet, and tolerate systems that are meant to remain invisible.',
  },
  'Defense Intelligence Agency': {
    overview: 'The DIA is the Pentagon’s all-source intelligence agency and a major supporter of military operations. It works where analysis, clandestine collection, and combat support overlap.',
    operations: 'Its directorates and field elements support the warfighter, often overseas and often in close contact with other military and intelligence organizations. DCS, analysis, and attaché work all sit inside a larger mission to understand foreign militaries and hostile states.',
    friction: 'The DIA has to compete with the CIA and with other defense intelligence branches while also serving the Department of Defense. That creates plenty of political and procedural friction even when the mission is clear.',
    culture: 'The culture is military, practical, and oriented toward operations. It tends to favor people who can think in terms of capability, deployment, and consequence.',
  },
  'National Geospatial-Intelligence Agency': {
    overview: 'NGA turns imagery and geospatial data into usable intelligence. It helps decision-makers understand location, movement, terrain, and the meaning of change on the ground.',
    operations: 'Its analysts work with satellites, drones, maps, pattern analysis, and terrain products. The agency is quiet by design, but its work often shapes how others respond to major events.',
    friction: 'NGA has to stay aligned with military and intelligence partners while constantly defending the value of its products. People who think maps are simple do not tend to understand the mission.',
    culture: 'The culture is collegial, technically strong, and still influenced by military expectations. It suits people who like visual reasoning and exacting analysis.',
  },
  'National Reconnaissance Office': {
    overview: 'The NRO designs, builds, launches, and runs the nation’s secret reconnaissance satellites. It is a high-budget, highly controlled organization where engineering and collection priorities are inseparable.',
    operations: 'The NRO handles everything from satellite design and launch to ground systems and collection management. It also has to make sure that every request for data is weighed against everyone else’s request for the same limited asset.',
    friction: 'The agency’s biggest problem is that everybody wants its resources and everybody thinks their target is the most important. That creates constant pressure over access, timing, and secrecy.',
    culture: 'The culture is technically exacting and deeply private. It rewards people who can manage delicate systems and still think several steps ahead.',
  },
  'National Park Service': {
    overview: 'The Park Service is a surprisingly broad federal mission that includes law enforcement, archaeology, firefighting, ecology, and public interpretation. It has to protect places that are simultaneously landscapes, historical records, and crime scenes.',
    operations: 'Its people work in backcountry, front country, fire zones, monuments, rivers, and remote sites where backup is slow. Investigation, rescue, and preservation all happen in the same terrain, often with not enough staff.',
    friction: 'The Park Service is chronically under-resourced for the amount of ground it covers. Its personnel are expected to carry their own gear, solve their own problems, and still preserve the thing everyone came to see.',
    culture: 'The culture is scrappy, physically demanding, and more practical than the public often realizes. Good NPS people can switch from educator to investigator to responder without changing tone.',
  },
  'Federal Emergency Management Agency': {
    overview: 'FEMA coordinates large-scale disaster response when local capacity is overwhelmed. It is built around surge staffing, regional response, and the ability to organize the chaos after the damage is already done.',
    operations: 'Its teams handle medical response, search and rescue, logistics, mitigation, and planning. During a crisis it becomes a distributed operational network rather than a normal desk-bound bureaucracy.',
    friction: 'Every FEMA success is treated as expected and every failure becomes a political event. That makes the agency vulnerable to criticism, conspiracy theory, and the ordinary mess of major disasters.',
    culture: 'The culture is practical, calm, and team-oriented. FEMA people tend to be at their best when the situation is ugly and everyone else is panicking.',
  },
  'NASA': {
    overview: 'NASA is the civilian U.S. agency for spaceflight and high-atmosphere research. It combines engineering, science, launch operations, and a lot of highly educated people trying to keep very expensive hardware alive.',
    operations: 'Its work spans directorates, launch sites, mission control, and specialized research centers. Safety, precision, and cross-disciplinary teamwork are mandatory because the mission is too expensive to bluff through.',
    friction: 'NASA has to justify its work to Congress and the public while coordinating with military and intelligence partners on highly specific projects. Budgets and failures are always under scrutiny.',
    culture: 'The culture rewards smart people who can work together, not just impress each other. Creativity matters, but so does the ability to double-check everything.',
  },
  'NASA Armstrong Flight Research Center': {
    overview: 'Armstrong is NASA’s center for experimental flight research and advanced aircraft testing. It exists to push aircraft and aerospace concepts further than ordinary engineering programs dare to go.',
    operations: 'The center is where new flight systems, test programs, and unusual aerospace ideas are evaluated in the real world. That makes it a home for engineers and pilots who understand that the air is an unforgiving laboratory.',
    friction: 'The work is expensive, watched, and always balancing curiosity against oversight. The more interesting the program, the more someone wants a clean explanation of the risk.',
    culture: 'The culture rewards technical courage and disciplined testing. It is a good home for people who like to prove an idea with hardware instead of just talking about it.',
  },
  DARPA: {
    overview: 'DARPA is the federal government’s high-risk innovation engine. It funds breakthrough technologies rather than running them like a normal laboratory, which gives it outsized influence for its size.',
    operations: 'Program managers recruit ideas, performers, and prototypes, then push them toward results on a short clock. The model favors people who can move fast without becoming careless.',
    friction: 'DARPA has to keep projects bold enough to matter and discreet enough not to cause political panic. That balance is part of the job.',
    culture: 'The culture is intense, exacting, and not interested in mediocre work. It rewards people who can think clearly, manage complexity, and still finish the project.',
  },
  'National Nuclear Security Administration': {
    overview: 'NNSA protects and manages the nation’s nuclear stockpile and the systems around it. It also handles radiological response, secure transport, and specialized emergency capability.',
    operations: 'Its people work in secure transport, technical response teams, search groups, and render-safe operations for nuclear and radiological threats. The mission is about control, containment, and readiness.',
    friction: 'NNSA is burdened by the stakes of being wrong and by internal rigidity that can make promotion and coordination harder than they should be. It also attracts a lot of outside misunderstanding.',
    culture: 'The culture is technical, careful, and often surprisingly humane about work-life balance. People there tend to value competence more than theatrics.',
  },
  'Internal Revenue Service': {
    overview: 'The IRS is the government’s tax collection and tax enforcement machine. Most of it is bureaucracy, but the criminal side turns financial records into serious federal cases.',
    operations: 'Its investigators and support staff work through records, digital evidence, financial tracing, and tax law. Because almost every crime leaves a money trail, the IRS can end up relevant to a lot more than taxes.',
    friction: 'The IRS is unpopular by default, which makes it easy to cut and easy to blame. That means its best work often happens under scrutiny and limited resources.',
    culture: 'The culture is process-heavy, detail-oriented, and more risk-averse than flashy. The people who thrive there usually like order and consequences.',
  },
  Constellis: {
    overview: 'Constellis is a private risk and security contractor built around protection, training, and support work in difficult environments. It exists where former military and law-enforcement experience can be sold as a service.',
    operations: 'Its teams guard clients, train personnel, handle crisis response, and support specialized security missions. The company depends heavily on travel, reputation, and the ability to deliver when the client needs visible competence.',
    friction: 'Constellis has to manage competition, scrutiny, and the legacy of private security scandals. It is a business first, but it sells trust, so reputation matters constantly.',
    culture: 'The culture is ambitious, client-focused, and full of strong personalities. Professionalism is part of the product, not just a nice extra.',
  },
  'Lockheed Martin': {
    overview: 'Lockheed Martin is one of the dominant defense contractors in the world. It works across aerospace, systems, security, and advanced technology, with the Skunk Works as its most famous experimental environment.',
    operations: 'Employees move between government contracts, classified projects, and highly technical programs where the client often controls the tempo. The company builds the tools, systems, and aircraft that shape what the government can do next.',
    friction: 'Lockheed has to balance cost, oversight, competition, and the challenge of keeping exceptional people aligned with huge projects. Success is celebrated, but it always comes with scrutiny.',
    culture: 'The culture is demanding but often well-supported, especially for people who like large, technical, and well-funded programs. It expects competence and rewards people who can deliver.',
  },
  'Lockheed Martin Skunk Works': {
    overview: 'Skunk Works is Lockheed’s most secretive and experimental space. It is where disruptive aerospace ideas get turned into hardware under intense security and oversight.',
    operations: 'The projects here are usually advanced aircraft, test programs, or highly unusual systems that require creativity and discipline at the same time. Nobody works here casually.',
    friction: 'The tension is between secrecy and invention. Everyone wants the breakthrough, but nobody wants a leak or an uncontrolled experiment.',
    culture: 'The culture rewards people who can be brilliant without needing constant supervision. It is a place for people who are comfortable with serious responsibility.',
  },
  'CACI / Booz Allen Hamilton': {
    overview: 'CACI and Booz Allen Hamilton are contractor ecosystems for intelligence, cyber, analytics, engineering, and specialized support. They slot trained people into government work without waiting for long internal hiring cycles.',
    operations: 'Their staff work in government buildings, SCIFs, project offices, and embedded support roles where the real job is to keep the mission moving and the client satisfied. The work often feels like government work, but the company and the client are never the same thing.',
    friction: 'The companies compete with each other and with other contractors while also living at the mercy of budget shifts and client demands. They are useful, but never fully in control.',
    culture: 'The culture is adaptive, professional, and shaped by temporary assignments. Good contractors learn to deliver results while moving between missions and clients.',
  },
  'RAND Corporation': {
    overview: 'RAND is a nonprofit research and policy institution that turns data, expertise, and skepticism into recommendations. It works across national security, health, economics, education, and other fields where analysis can change policy.',
    operations: 'RAND researchers travel, gather evidence, test assumptions, and talk to people who actually live inside the systems they study. The organization expects uncomfortable findings to survive if the evidence is good.',
    friction: 'RAND’s work is frequently controversial because it is designed to challenge assumptions rather than flatter them. That makes it important and vulnerable at the same time.',
    culture: 'The culture rewards sharp minds, interdisciplinary curiosity, and the willingness to follow the data where it leads. Being intellectually inconvenient is often a virtue here.',
  },
  Default: {
    overview: 'This role sits in a specialized federal, military, or contractor environment where process, access, and judgment all matter.',
    operations: 'The work usually blends field competence with bureaucratic awareness and the ability to use restricted tools responsibly.',
    friction: 'The usual tension is between mission urgency and institutional procedure.',
    culture: 'The culture values competence, restraint, and the ability to keep working when the job gets messy.',
  },
};
