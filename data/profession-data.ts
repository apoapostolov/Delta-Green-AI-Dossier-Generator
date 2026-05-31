// This file is repurposed to hold Profession data for Delta Green.
import type { Profession } from '../types';
import { attachCoreProfessionInfoIds, buildCoreProfessionInformation } from './core-profession-dossiers';
import { buildComplexProfessions } from './complex-profession-dossiers';

const BASE_PROFESSIONS: Profession[] = [
    {
        name: 'Anthropologist or Historian',
        description: 'You study humanity. You\'re concerned with the patterns that emerge over time, across land masses, cultures, and language groups. You might be a number-cruncher, a field worker trudging through the jungle, a consultant in a war zone, or a think-tank analyst sifting myth from history in studies of the Tcho-Tcho peoples.',
        group: 'Academic Expert',
        recommendedStats: ['INT'],
        professionalSkills: [
            { name: 'Bureaucracy', value: 40 },
            { name: 'Foreign Language', value: 50 },
            { name: 'Foreign Language', value: 40 },
            { name: 'History', value: 60 },
            { name: 'Occult', value: 40 },
            { name: 'Persuade', value: 40 }
        ],
        choiceGroups: [
            { count: 1, options: [{ name: 'Anthropology', value: 50 }, { name: 'Archaeology', value: 50 }] },
            { count: 2, options: [
                { name: 'Anthropology', value: 40 }, 
                { name: 'Archaeology', value: 40 },
                { name: 'HUMINT', value: 50 },
                { name: 'Navigate', value: 50 },
                { name: 'Ride', value: 50 },
                { name: 'Search', value: 60 },
                { name: 'Survival', value: 50 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Practical field khakis and a worn leather satchel, or tweed jacket with elbow patches for campus.",
        ranks: ["Research Assistant", "Junior Fellow", "Associate Professor", "Tenured Professor", "Department Chair", "Museum Curator"],
        source: "Delta Green Agent's Handbook",
        page: 20,
        equipmentKit: ["INVESTIGATOR'S KIT"]
    },
    {
        name: 'Computer Scientist or Engineer',
        description: 'Computers and machinery are the backbone of modern industry. You are a craftsman with data or machinery, possibly for the government and most definitely for profit. However you use your skills, the overlap between information technology and awareness of the unnatural could make this the most dangerous job on the planet.',
        group: 'Civilian Specialist',
        recommendedStats: ['INT'],
        professionalSkills: [
            { name: 'Computer Science', value: 60 },
            { name: 'Craft', value: 30 }, // Electrician
            { name: 'Craft', value: 30 }, // Mechanic
            { name: 'Craft', value: 40 }, // Microelectronics
            { name: 'Science', value: 40 }, // Mathematics
            { name: 'SIGINT', value: 40 }
        ],
        choiceGroups: [
            { count: 4, options: [
                { name: 'Accounting', value: 50 },
                { name: 'Bureaucracy', value: 50 },
                { name: 'Craft', value: 40 },
                { name: 'Foreign Language', value: 40 },
                { name: 'Heavy Machinery', value: 50 },
                { name: 'Law', value: 40 },
                { name: 'Science', value: 40 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Company logo polo shirt and slacks, or a hoodie and jeans. Always has a high-tech backpack.",
        ranks: ["Junior Developer", "Systems Engineer", "Senior Engineer", "Lead Architect", "Project Manager", "Chief Technology Officer"],
        source: "Delta Green Agent's Handbook",
        page: 20,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        specialTrainings: ['Electronic Security Systems']
    },
    {
        name: 'Federal Agent',
        description: 'Many Delta Green Agents are federal law enforcement officers, mostly from the FBI. Delta Green decided long ago that federal agents have the optimum balance of skills and mental stability needed to confront the unnatural.',
        group: 'Federal Agent',
        recommendedStats: ['CON', 'POW', 'CHA'],
        professionalSkills: [
            { name: 'Alertness', value: 50 },
            { name: 'Bureaucracy', value: 40 },
            { name: 'Criminology', value: 50 },
            { name: 'Drive', value: 50 },
            { name: 'Firearms', value: 50 },
            { name: 'Forensics', value: 30 },
            { name: 'HUMINT', value: 60 },
            { name: 'Law', value: 30 },
            { name: 'Persuade', value: 50 },
            { name: 'Search', value: 50 },
            { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [
            { count: 1, options: [
                { name: 'Accounting', value: 60 },
                { name: 'Computer Science', value: 50 },
                { name: 'Foreign Language', value: 50 },
                { name: 'Heavy Weapons', value: 50 },
                { name: 'Pharmacy', value: 50 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A conservative, off-the-rack suit that doesn't quite fit right. Service pistol is barely concealed.",
        ranks: ["New Agent Trainee", "Special Agent", "Senior Resident Agent", "Supervisory Special Agent", "Assistant Special Agent in Charge", "Special Agent in Charge"],
        source: "Delta Green Agent's Handbook",
        page: 20,
        equipmentKit: ['FEDERAL AGENT']
    },
    {
        name: 'Physician',
        description: 'Doctors are often the first to uncover signs of an unnatural incursion, and the most valuable investigators of its disastrous effects on humanity.',
        group: 'Civilian Specialist',
        recommendedStats: ['INT', 'POW', 'DEX'],
        professionalSkills: [
            { name: 'Bureaucracy', value: 50 },
            { name: 'First Aid', value: 60 },
            { name: 'Medicine', value: 60 },
            { name: 'Persuade', value: 40 },
            { name: 'Pharmacy', value: 50 },
            { name: 'Science', value: 60 }, // Biology
            { name: 'Search', value: 40 }
        ],
        choiceGroups: [
            { count: 2, options: [
                { name: 'Forensics', value: 50 },
                { name: 'Psychotherapy', value: 60 },
                { name: 'Science', value: 50 },
                { name: 'Surgery', value: 50 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Blue scrubs and comfortable clogs, or a white lab coat over professional attire.",
        ranks: ["Intern", "Resident", "Attending Physician", "Fellow", "Chief of Medicine", "Hospital Administrator"],
        source: "Delta Green Agent's Handbook",
        page: 21,
        equipmentKit: ["SCIENTIST / MEDICAL KIT"]
    },
    {
        name: 'Scientist',
        description: 'You expand human knowledge in a field such as biology, physics, or chemistry. When certain forms of knowledge cause insanity and death, it\'s easy to conclude that some hypotheses should not be tested.',
        group: 'Academic Expert',
        recommendedStats: ['INT'],
        professionalSkills: [
            { name: 'Bureaucracy', value: 40 },
            { name: 'Computer Science', value: 40 },
            { name: 'Science', value: 60 },
            { name: 'Science', value: 50 },
            { name: 'Science', value: 50 }
        ],
        choiceGroups: [
            { count: 3, options: [
                { name: 'Accounting', value: 50 },
                { name: 'Craft', value: 40 },
                { name: 'Foreign Language', value: 40 },
                { name: 'Forensics', value: 40 },
                { name: 'Law', value: 40 },
                { name: 'Pharmacy', value: 40 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A stained lab coat over a button-down shirt, safety goggles pushed up on the forehead.",
        ranks: ["Lab Technician", "Research Scientist", "Senior Scientist", "Principal Investigator", "Lab Director", "Chief Science Officer"],
        source: "Delta Green Agent's Handbook",
        page: 21,
        equipmentKit: ["SCIENTIST / MEDICAL KIT"]
    },
    {
        name: 'Special Operator',
        description: 'As part of a force like the U.S. Army Rangers, you volunteered for a more difficult path than other soldiers. You\'ve spent years in the most grueling training on the planet, and now serve on the most dangerous missions around.',
        group: 'Military',
        recommendedStats: ['STR', 'CON', 'POW'],
        professionalSkills: [
            { name: 'Alertness', value: 60 },
            { name: 'Athletics', value: 60 },
            { name: 'Demolitions', value: 40 },
            { name: 'Firearms', value: 60 },
            { name: 'Heavy Weapons', value: 50 },
            { name: 'Melee Weapons', value: 50 },
            { name: 'Military Science', value: 60 },
            { name: 'Navigate', value: 50 },
            { name: 'Stealth', value: 50 },
            { name: 'Survival', value: 50 },
            { name: 'Swim', value: 50 },
            { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 2,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Sterile tactical gear and combat boots, or a discreet civilian jacket and baseball cap when off-duty.",
        ranks: ["Operator", "Senior Operator", "Team Leader", "Troop Sergeant Major", "Squadron Sergeant Major", "Unit Command Sergeant Major"],
        source: "Delta Green Agent's Handbook",
        page: 21,
        equipmentKit: ['SPECIAL OPERATOR'],
        specialTrainings: ['Parachuting', 'Hand Grenades']
    },
     {
        name: 'Criminal',
        description: 'So much is illegal that there are broad economies of crime. This profile fits a hardened militant or a traditional "black collar" criminal: pimp, burglar, extortionist, or thug.',
        group: 'Civilian Specialist',
        recommendedStats: ['STR', 'DEX'],
        professionalSkills: [
            { name: 'Alertness', value: 50 },
            { name: 'Athletics', value: 50 },
            { name: 'Criminology', value: 60 },
            { name: 'Dodge', value: 40 },
            { name: 'Drive', value: 50 },
            { name: 'Firearms', value: 40 },
            { name: 'Law', value: 20 },
            { name: 'Melee Weapons', value: 40 },
            { name: 'Persuade', value: 50 },
            { name: 'Stealth', value: 50 },
            { name: 'Unarmed Combat', value: 50 }
        ],
        choiceGroups: [
            { count: 2, options: [
                { name: 'Craft', value: 40 }, // Locksmithing
                { name: 'Demolitions', value: 40 },
                { name: 'Disguise', value: 50 },
                { name: 'Foreign Language', value: 40 },
                { name: 'Forensics', value: 40 },
                { name: 'HUMINT', value: 50 },
                { name: 'Navigate', value: 50 },
                { name: 'Occult', value: 50 },
                { name: 'Pharmacy', value: 40 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Flashy tracksuit and gold chains, or a dark hoodie and worn jeans for work.",
        ranks: ["Street Punk", "Enforcer", "Lieutenant", "Capo", "Underboss", "Crime Boss"],
        source: "Delta Green Agent's Handbook",
        page: 23,
        equipmentKit: ["CRIMINAL'S KIT"],
        specialTrainings: ['Lockpicks', 'Black Markets']
    },
    {
        name: 'Firefighter',
        description: 'Your job oscillates between the tedium of maintaining your gear, exhilaration when the alarm finally comes, and the work of investigating a scene after the smoke has cleared. If you\'re involved with Delta Green, you clearly stumbled into something worse than a house fire.',
        group: 'Civilian Specialist',
        recommendedStats: ['STR', 'DEX', 'CON'],
        professionalSkills: [
            { name: 'Alertness', value: 50 },
            { name: 'Athletics', value: 60 },
            { name: 'Craft', value: 40 }, // Electrician
            { name: 'Craft', value: 40 }, // Mechanic
            { name: 'Demolitions', value: 50 },
            { name: 'Drive', value: 50 },
            { name: 'First Aid', value: 50 },
            { name: 'Forensics', value: 40 },
            { name: 'Heavy Machinery', value: 50 },
            { name: 'Navigate', value: 50 },
            { name: 'Search', value: 40 }
        ],
        choiceGroups: [],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Heavy turnout gear smelling of smoke, or a simple station uniform T-shirt and cargo pants.",
        ranks: ["Probationary Firefighter", "Firefighter", "Driver-Engineer", "Lieutenant", "Captain", "Battalion Chief"],
        source: "Delta Green Agent's Handbook",
        page: 23,
        equipmentKit: ["FIRST RESPONDER KIT"],
        specialTrainings: ['Rappelling']
    },
    {
        name: 'Foreign Service Officer',
        description: 'You travel to strange lands, meet interesting people, and try to get along with them. Odds are you work for the State Department, though USAID, the Commercial Service and the Foreign Agriculture Service also have FSOs. Either way, you\'ve had every opportunity to learn exotic and deadly things; the kinds of things that qualify you for Delta Green clearance.',
        group: 'Federal Agent',
        recommendedStats: ['INT', 'CHA'],
        professionalSkills: [
            { name: 'Accounting', value: 40 },
            { name: 'Anthropology', value: 40 },
            { name: 'Bureaucracy', value: 60 },
            { name: 'Foreign Language', value: 50 },
            { name: 'Foreign Language', value: 50 },
            { name: 'Foreign Language', value: 40 },
            { name: 'History', value: 40 },
            { name: 'HUMINT', value: 50 },
            { name: 'Law', value: 40 },
            { name: 'Persuade', value: 50 }
        ],
        choiceGroups: [],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A perfectly tailored suit for embassy functions, or lightweight linen clothing for a tropical posting.",
        ranks: ["FSO Grade 6 (Vice Consul)", "FSO Grade 5 (Consul)", "FSO Grade 4 (First Secretary)", "FSO Grade 3 (Counselor)", "FSO Grade 2 (Deputy Chief of Mission)", "FSO Grade 1 (Ambassador)"],
        source: "Delta Green Agent's Handbook",
        page: 23,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"]
    },
    {
        name: 'Intelligence Analyst',
        description: 'In the FBI, NSA and CIA, there are those who gather information and those who decide what it means. You take information from disparate sources—newspapers, websites, informants, ELINT, and the assets developed by Case Officers—and figure out what it means. In short, your job is the piecing together of unrelated knowledge, a dangerous endeavor in the world of Delta Green.',
        group: 'Federal Agent',
        recommendedStats: ['INT'],
        professionalSkills: [
            { name: 'Anthropology', value: 40 },
            { name: 'Bureaucracy', value: 50 },
            { name: 'Computer Science', value: 40 },
            { name: 'Criminology', value: 40 },
            { name: 'Foreign Language', value: 50 },
            { name: 'Foreign Language', value: 50 },
            { name: 'Foreign Language', value: 40 },
            { name: 'History', value: 40 },
            { name: 'HUMINT', value: 50 },
            { name: 'SIGINT', value: 40 }
        ],
        choiceGroups: [],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Nondescript government office attire: slacks, a button-down shirt (sleeves rolled up), and a perpetually tired look.",
        ranks: ["Analyst Trainee", "Intelligence Analyst", "Senior Analyst", "Reports Officer", "Unit Chief", "Section Chief"],
        source: "Delta Green Agent's Handbook",
        page: 24,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"]
    },
    {
        name: 'Intelligence Case Officer',
        description: 'You recruit people to spy on their own countries for your agency, probably the CIA. Your job is to develop foreign intelligence sources ("assets"), communicate with them, and keep them under control, productive, and alive. It\'s a hard business because you must view everyone as a potential threat, liar, or tool to further your agenda. If your name came to the attention of Delta Green, congratulations; you are now someone else\'s asset.',
        group: 'Federal Agent',
        recommendedStats: ['INT', 'POW', 'CHA'],
        professionalSkills: [
            { name: 'Alertness', value: 50 },
            { name: 'Bureaucracy', value: 40 },
            { name: 'Criminology', value: 50 },
            { name: 'Disguise', value: 50 },
            { name: 'Drive', value: 40 },
            { name: 'Firearms', value: 40 },
            { name: 'Foreign Language', value: 50 },
            { name: 'Foreign Language', value: 40 },
            { name: 'HUMINT', value: 60 },
            { name: 'Persuade', value: 60 },
            { name: 'SIGINT', value: 40 },
            { name: 'Stealth', value: 50 },
            { name: 'Unarmed Combat', value: 50 }
        ],
        choiceGroups: [],
        bonds: 2,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Adaptable civilian clothes that blend into any environment, from a European cafe to a dusty bazaar.",
        ranks: ["Career Trainee", "Operations Officer", "Supervisory Operations Officer", "Deputy Chief of Station", "Chief of Station", "Senior Intelligence Service"],
        source: "Delta Green Agent's Handbook",
        page: 24,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        specialTrainings: ['Advanced Interrogation', 'Physical Surveillance']
    },
    {
        name: 'Lawyer or Business Executive',
        description: 'Your tools are a computer and smartphone. You might be moving millions of dollars, or bits of data, or both. Or you might be a prosecutor, a defense attorney, or judge.',
        group: 'Civilian Specialist',
        recommendedStats: ['INT', 'CHA'],
        professionalSkills: [
            { name: 'Accounting', value: 50 },
            { name: 'Bureaucracy', value: 50 },
            { name: 'HUMINT', value: 40 },
            { name: 'Persuade', value: 60 }
        ],
        choiceGroups: [
            { count: 4, options: [
                { name: 'Computer Science', value: 50 },
                { name: 'Criminology', value: 60 },
                { name: 'Foreign Language', value: 50 },
                { name: 'Law', value: 50 },
                { name: 'Pharmacy', value: 50 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "An expensive, sharp suit and polished shoes. Carries a high-end leather briefcase.",
        ranks: ["Associate / Junior Executive", "Partner / Manager", "Senior Partner / Director", "Managing Partner / Vice President", "General Counsel / CEO", "Board Member"],
        source: "Delta Green Agent's Handbook",
        page: 24,
        equipmentKit: ["CORPORATE KIT"]
    },
    {
        name: 'Media Specialist',
        description: 'You might be an author, an editor, a researcher for a company or any branch of the government, a blogger, a TV reporter, or a scholar of rare texts. With the unnatural, you\'ve uncovered the story of a lifetime.',
        group: 'Civilian Specialist',
        recommendedStats: ['INT', 'CHA'],
        professionalSkills: [
            { name: 'Art', value: 60 }, // Writing, etc.
            { name: 'History', value: 40 },
            { name: 'HUMINT', value: 40 },
            { name: 'Persuade', value: 50 }
        ],
        choiceGroups: [
            { count: 5, options: [
                { name: 'Anthropology', value: 40 },
                { name: 'Archaeology', value: 40 },
                { name: 'Art', value: 40 },
                { name: 'Bureaucracy', value: 50 },
                { name: 'Computer Science', value: 40 },
                { name: 'Criminology', value: 50 },
                { name: 'Foreign Language', value: 40 },
                { name: 'Law', value: 40 },
                { name: 'Military Science', value: 40 },
                { name: 'Occult', value: 50 },
                { name: 'Science', value: 40 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A practical photographer's vest with many pockets, or a stylish but comfortable outfit for interviews.",
        ranks: ["Intern/Stringer", "Staff Writer/Photographer", "Investigative Reporter", "Senior Editor", "Bureau Chief", "Executive Producer"],
        source: "Delta Green Agent's Handbook",
        page: 24,
        equipmentKit: ["INVESTIGATOR'S KIT"]
    },
    {
        name: 'Nurse or Paramedic',
        description: 'Medical professionals are on the front line when awful things happen. Is that what brought you to the group\'s attention?',
        group: 'Civilian Specialist',
        recommendedStats: ['INT', 'POW', 'CHA'],
        professionalSkills: [
            { name: 'Alertness', value: 40 },
            { name: 'Bureaucracy', value: 40 },
            { name: 'First Aid', value: 60 },
            { name: 'HUMINT', value: 40 },
            { name: 'Medicine', value: 40 },
            { name: 'Persuade', value: 40 },
            { name: 'Pharmacy', value: 40 },
            { name: 'Science', value: 40 } // Biology
        ],
        choiceGroups: [
            { count: 2, options: [
                { name: 'Drive', value: 60 },
                { name: 'Forensics', value: 40 },
                { name: 'Navigate', value: 50 },
                { name: 'Psychotherapy', value: 50 },
                { name: 'Search', value: 60 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Practical scrubs or a paramedic's uniform, with trauma shears and a stethoscope always within reach.",
        ranks: ["EMT/Student Nurse", "Paramedic/Registered Nurse", "Field Training Officer/Charge Nurse", "Operations Supervisor/Nurse Manager", "EMS Captain/Director of Nursing", "Medical Director"],
        source: "Delta Green Agent's Handbook",
        page: 25,
        equipmentKit: ["FIRST RESPONDER KIT"]
    },
    {
        name: 'Pilot or Sailor',
        description: 'Air or sea, commercial or military, your duty is to keep your passengers alive and craft intact. This can lead to hard choices when your passengers put the vehicle in danger. Or are you a drone operator, flying a Predator from a thousand miles away? Either way, what op brought you to the attention of Delta Green?',
        group: 'Military',
        recommendedStats: ['DEX', 'INT'],
        professionalSkills: [
            { name: 'Alertness', value: 60 },
            { name: 'Bureaucracy', value: 30 },
            { name: 'Craft', value: 40 }, // Electrician
            { name: 'Craft', value: 40 }, // Mechanic
            { name: 'Navigate', value: 50 },
            { name: 'Pilot', value: 60 },
            { name: 'Science', value: 40 }, // Meteorology
            { name: 'Swim', value: 40 }
        ],
        choiceGroups: [
            { count: 2, options: [
                { name: 'Foreign Language', value: 50 },
                { name: 'Pilot', value: 50 },
                { name: 'Heavy Weapons', value: 50 },
                { name: 'Military Science', value: 50 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A flight suit or crisp officer's uniform, complete with aviator sunglasses.",
        ranks: ["Ensign/Second Lieutenant", "Lieutenant JG/First Lieutenant", "Lieutenant/Captain", "Lieutenant Commander/Major", "Commander/Lieutenant Colonel", "Captain/Colonel"],
        source: "Delta Green Agent's Handbook",
        page: 25,
        equipmentKit: ["SOLDIER'S KIT"],
        specialTrainings: ['Drone Piloting']
    },
    {
        name: 'Police Officer',
        description: 'You serve and protect. Police officers walk the beat in uniform. Deputy sheriffs answer to an elected law enforcer and have jurisdiction over an entire county. Detectives come in after the fact and put the pieces together.',
        group: 'Federal Agent',
        recommendedStats: ['STR', 'CON', 'POW'],
        professionalSkills: [
            { name: 'Alertness', value: 60 },
            { name: 'Bureaucracy', value: 40 },
            { name: 'Criminology', value: 40 },
            { name: 'Drive', value: 50 },
            { name: 'Firearms', value: 40 },
            { name: 'First Aid', value: 30 },
            { name: 'HUMINT', value: 50 },
            { name: 'Law', value: 30 },
            { name: 'Melee Weapons', value: 50 },
            { name: 'Navigate', value: 40 },
            { name: 'Persuade', value: 40 },
            { name: 'Search', value: 40 },
            { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [
            { count: 1, options: [
                { name: 'Forensics', value: 50 },
                { name: 'Heavy Machinery', value: 60 },
                { name: 'Heavy Weapons', value: 50 },
                { name: 'Ride', value: 60 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A standard police uniform with a duty belt, or a detective's worn blazer and slacks.",
        ranks: ["Rookie Officer", "Patrol Officer", "Detective", "Sergeant", "Lieutenant", "Captain"],
        source: "Delta Green Agent's Handbook",
        page: 25,
        equipmentKit: ['POLICE OFFICER'],
        specialTrainings: ['Defensive Driving', 'Physical Surveillance']
    },
    {
        name: 'Program Manager',
        description: 'You run an organization. Someone has to secure funding, move resources, and make connections, and that\'s you. You control a budget and are responsible for how your program is maintained and where the money goes. Organizations discover the most startling things in their pursuit of profit or the public good.',
        group: 'Civilian Specialist',
        recommendedStats: ['INT', 'CHA'],
        professionalSkills: [
            { name: 'Accounting', value: 60 },
            { name: 'Bureaucracy', value: 60 },
            { name: 'Computer Science', value: 50 },
            { name: 'Criminology', value: 30 },
            { name: 'Foreign Language', value: 50 },
            { name: 'History', value: 40 },
            { name: 'Law', value: 40 },
            { name: 'Persuade', value: 50 }
        ],
        choiceGroups: [
            { count: 1, options: [
                { name: 'Anthropology', value: 30 },
                { name: 'Art', value: 30 },
                { name: 'Craft', value: 30 },
                { name: 'Science', value: 30 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Business casual attire, always holding a smartphone and a binder full of Gantt charts.",
        ranks: ["Program Coordinator", "Program Analyst", "Program Manager", "Senior Program Manager", "Director", "Executive Director"],
        source: "Delta Green Agent's Handbook",
        page: 25,
        equipmentKit: ["CORPORATE KIT"]
    },
    {
        name: 'Soldier or Marine',
        description: 'Governments will always need boots on the ground and steady hands holding rifles. When war begins, civilization gets out of the way. With the social contract void, unnatural things creep in at the edges. There\'s a reason Delta Green began in the military.',
        group: 'Military',
        recommendedStats: ['STR', 'CON'],
        professionalSkills: [
            { name: 'Alertness', value: 50 },
            { name: 'Athletics', value: 50 },
            { name: 'Bureaucracy', value: 30 },
            { name: 'Drive', value: 40 },
            { name: 'Firearms', value: 40 },
            { name: 'First Aid', value: 40 },
            { name: 'Military Science', value: 40 },
            { name: 'Navigate', value: 40 },
            { name: 'Persuade', value: 30 },
            { name: 'Unarmed Combat', value: 50 }
        ],
        choiceGroups: [
            { count: 3, options: [
                { name: 'Artillery', value: 40 },
                { name: 'Computer Science', value: 40 },
                { name: 'Craft', value: 40 },
                { name: 'Demolitions', value: 40 },
                { name: 'Foreign Language', value: 40 },
                { name: 'Heavy Machinery', value: 50 },
                { name: 'Heavy Weapons', value: 40 },
                { name: 'Search', value: 60 },
                { name: 'SIGINT', value: 40 },
                { name: 'Swim', value: 60 }
            ]}
        ],
        bonds: 4,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "Standard issue camouflage uniform and combat boots, meticulously maintained.",
        ranks: ["Private", "Specialist/Corporal", "Sergeant", "Staff Sergeant", "Sergeant First Class", "First Sergeant/Master Sergeant"],
        source: "Delta Green Agent's Handbook",
        page: 25,
        equipmentKit: ["SOLDIER'S KIT"]
    },
    // --- SPECIAL PROFESSIONS ---
    {
        name: 'Marine Corps Embassy Security Group',
        infoId: 'agency_usmc',
        description: 'Provides security for U.S. embassies and consulates around the world. Marines in this role are highly trained in protective services and embassy defense protocols.',
        group: 'Military',
        recommendedStats: ['STR', 'CON', 'POW'],
        professionalSkills: [
            { name: 'Alertness', value: 60 }, { name: 'Bureaucracy', value: 50 }, { name: 'Criminology', value: 40 },
            { name: 'Drive', value: 50 }, { name: 'Firearms', value: 50 }, { name: 'First Aid', value: 30 },
            { name: 'Foreign Language', value: 40 }, { name: 'HUMINT', value: 50 }, { name: 'Melee Weapons', value: 50 },
            { name: 'Military Science', value: 40 }, { name: 'Persuade', value: 50 }, { name: 'Search', value: 40 },
            { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [ { count: 1, options: [ { name: 'Dodge', value: 50 }, { name: 'Stealth', value: 50 }, { name: 'SIGINT', value: 40 } ] } ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        archetypicalClothing: "A crisp Marine Corps dress uniform or sterile civilian suit for protective detail.",
        ranks: ["Watchstander", "Corporal of the Guard", "Sergeant of the Guard", "Assistant Detachment Commander", "Detachment Commander", "Regional Commander"],
        source: "The Complex",
        page: 138,
        equipmentKit: ["BODYGUARD"],
        isDepartment: true,
        eligibleProfessions: ['Police Officer', 'Soldier or Marine', 'Special Operator'],
    },
    {
        name: 'FBI HRT/SWAT Operator',
        infoId: 'agency_fbi',
        description: "An elite tactical operator within the FBI, specializing in high-risk entries, hostage rescue, and counter-terrorism operations. Part of either a regional SWAT team or the national Hostage Rescue Team.",
        group: 'Federal Agent',
        recommendedStats: ['STR', 'DEX', 'CON'],
        professionalSkills: [
            { name: 'Alertness', value: 60 }, { name: 'Athletics', value: 60 }, { name: 'Demolitions', value: 40 },
            { name: 'Dodge', value: 50 }, { name: 'Firearms', value: 60 }, { name: 'Forensics', value: 30 },
            { name: 'Heavy Weapons', value: 50 }, { name: 'Melee Weapons', value: 50 }, { name: 'Military Science', value: 60 },
            { name: 'Navigate', value: 50 }, { name: 'Stealth', value: 50 }, { name: 'Survival', value: 50 },
            { name: 'Swim', value: 50 }, { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 1,
        bonusSkillAdvancements: 4,
        ranks: ["Operator", "Senior Operator", "Team Leader", "Unit Chief", "Section Chief", "Commander, HRT"],
        source: "The Complex",
        page: 113,
        equipmentKit: ['SWAT TEAM'],
        isDepartment: true,
        eligibleProfessions: ['Federal Agent', 'Special Operator', 'Soldier or Marine', 'Police Officer'],
        specialTrainings: ['Tear Gas & Stun Grenades', 'Explosive Entry / Breaching']
    },
    {
        name: 'DEA FAST Operator',
        infoId: 'agency_dea',
        description: "A paramilitary agent in the DEA's Foreign-deployed Advisory Support Teams, operating in global hotspots to dismantle narco-terrorist networks.",
        group: 'Federal Agent',
        recommendedStats: ['CON', 'DEX'],
        professionalSkills: [
            { name: 'Alertness', value: 50 }, { name: 'Bureaucracy', value: 40 }, { name: 'Criminology', value: 50 },
            { name: 'Drive', value: 40 }, { name: 'Firearms', value: 50 }, { name: 'Foreign Language', value: 30 },
            { name: 'Forensics', value: 30 }, { name: 'Heavy Weapons', value: 30 }, { name: 'HUMINT', value: 40 },
            { name: 'Law', value: 30 }, { name: 'Military Science', value: 30 }, { name: 'Persuade', value: 40 },
            { name: 'Pharmacy', value: 30 }, { name: 'Search', value: 50 }, { name: 'Survival', value: 30 },
            { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 2,
        bonusSkillAdvancements: 4, // Custom value based on source
        ranks: ["Team Member", "Senior Team Member", "Assistant Team Leader", "Team Leader", "FAST Country Manager", "FAST Section Chief"],
        source: "The Complex",
        page: 117,
        equipmentKit: ['SPECIAL OPERATOR'],
        isDepartment: true,
        eligibleProfessions: ['Federal Agent', 'Special Operator', 'Soldier or Marine'],
        specialTrainings: ['Advanced Interrogation', 'Black Markets']
    },
    {
        name: 'ICE SRT Operator',
        infoId: 'agency_ice',
        description: "A volunteer tactical operator for ICE's Special Response Team, handling high-risk warrants and critical incidents.",
        group: 'Federal Agent',
        recommendedStats: ['STR', 'DEX'],
        professionalSkills: [
            { name: 'Alertness', value: 50 }, { name: 'Bureaucracy', value: 40 }, { name: 'Criminology', value: 50 },
            { name: 'Dodge', value: 50 }, { name: 'Drive', value: 50 }, { name: 'Firearms', value: 50 },
            { name: 'Forensics', value: 30 }, { name: 'Heavy Weapons', value: 50 }, { name: 'HUMINT', value: 60 },
            { name: 'Law', value: 30 }, { name: 'Persuade', value: 50 }, { name: 'Search', value: 50 },
            { name: 'Stealth', value: 40 }, { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 2,
        bonusSkillAdvancements: 4,
        ranks: ["SRT Operator", "Senior SRT Operator", "SRT Team Leader", "SRT Commander", "Field Office SRT Coordinator", "National SRT Coordinator"],
        source: "The Complex",
        page: 121,
        equipmentKit: ['SWAT TEAM'],
        isDepartment: true,
        eligibleProfessions: ['Federal Agent'],
        specialTrainings: ['Tear Gas & Stun Grenades', 'Explosive Entry / Breaching']
    },
    {
        name: 'USMS SOG Operator',
        infoId: 'agency_usms',
        description: "A highly trained, all-volunteer deputy marshal in the Special Operations Group, providing tactical support for the most dangerous USMS missions.",
        group: 'Federal Agent',
        recommendedStats: ['STR', 'DEX'],
        professionalSkills: [
            { name: 'Alertness', value: 50 }, { name: 'Athletics', value: 40 }, { name: 'Bureaucracy', value: 40 },
            { name: 'Criminology', value: 50 }, { name: 'Dodge', value: 40 }, { name: 'Drive', value: 50 },
            { name: 'Firearms', value: 50 }, { name: 'Forensics', value: 30 }, { name: 'Heavy Weapons', value: 50 },
            { name: 'HUMINT', value: 60 }, { name: 'Law', value: 30 }, { name: 'Persuade', value: 50 },
            { name: 'Search', value: 50 }, { name: 'Stealth', value: 40 }, { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 2,
        bonusSkillAdvancements: 4,
        ranks: ["SOG Deputy", "Senior SOG Deputy", "SOG Team Leader", "SOG Section Chief", "Deputy Commander, SOG", "Commander, SOG"],
        source: "The Complex",
        page: 124,
        equipmentKit: ['SWAT TEAM'],
        isDepartment: true,
        eligibleProfessions: ['Federal Agent', 'Police Officer'],
        specialTrainings: ['Tear Gas & Stun Grenades', 'Explosive Entry / Breaching']
    },
    {
        name: 'Army 10th Mountain Division',
        infoId: 'agency_army',
        description: "A soldier in a rapid-deployment light infantry force specializing in harsh terrain and extreme weather.",
        group: 'Military',
        recommendedStats: ['STR', 'CON'],
        professionalSkills: [
            { name: 'Alertness', value: 50 }, { name: 'Athletics', value: 60 }, { name: 'Bureaucracy', value: 30 },
            { name: 'Drive', value: 40 }, { name: 'Firearms', value: 40 }, { name: 'First Aid', value: 30 },
            { name: 'Military Science', value: 40 }, { name: 'Navigate', value: 50 }, { name: 'Persuade', value: 30 },
            { name: 'Survival', value: 50 }, { name: 'Unarmed Combat', value: 50 }
        ],
        choiceGroups: [
            { count: 3, options: [
                { name: 'Computer Science', value: 40 }, { name: 'Craft', value: 40 }, { name: 'Demolitions', value: 40 },
                { name: 'Foreign Language', value: 40 }, { name: 'Heavy Machinery', value: 50 }, { name: 'Heavy Weapons', value: 40 },
                { name: 'Search', value: 60 }, { name: 'SIGINT', value: 40 }, { name: 'Swim', value: 60 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        ranks: ["Rifleman (Private)", "Automatic Rifleman (PFC)", "Grenadier (Specialist)", "Team Leader (Sergeant)", "Squad Leader (Staff Sergeant)", "Platoon Sergeant (SFC)"],
        source: "The Complex",
        page: 131,
        equipmentKit: ["SOLDIER'S KIT"],
        isDepartment: true,
        eligibleProfessions: ['Soldier or Marine'],
    },
    {
        name: 'Army 1st Cavalry Division',
        infoId: 'agency_army',
        description: "A soldier in a combined arms brigade combat team equipped with heavy armor like M1 Abrams tanks.",
        group: 'Military',
        recommendedStats: ['STR', 'CON'],
        professionalSkills: [
            { name: 'Heavy Weapons', value: 40 }, { name: 'Military Science', value: 40 }, { name: 'Navigate', value: 50 },
            { name: 'Stealth', value: 30 }, { name: 'Survival', value: 50 }, { name: 'Unarmed Combat', value: 50 }
        ],
        choiceGroups: [
            { count: 1, options: [
                { name: 'Artillery', value: 40 }, { name: 'Computer Science', value: 40 }, { name: 'Craft', value: 40 },
                { name: 'Demolitions', value: 40 }, { name: 'Foreign Language', value: 40 }, { name: 'SIGINT', value: 40 }
            ]}
        ],
        bonds: 3,
        bonusSkillAdvancements: 8,
        ranks: ["Tank Crewman (Private)", "Driver/Gunner (PFC)", "Loader (Specialist)", "Tank Commander (Sergeant)", "Section Leader (Staff Sergeant)", "Platoon Sergeant (SFC)"],
        source: "The Complex",
        page: 131,
        equipmentKit: ["SOLDIER'S KIT"],
        isDepartment: true,
        eligibleProfessions: ['Soldier or Marine'],
    },
    {
        name: 'CIA SAD/SOG Operator',
        infoId: 'agency_cia',
        description: "An elite paramilitary operator in the CIA's Special Activities Division, conducting high-threat covert operations worldwide.",
        group: 'Federal Agent',
        recommendedStats: ['STR', 'DEX', 'CON', 'POW'],
        professionalSkills: [
            { name: 'Alertness', value: 60 }, { name: 'Athletics', value: 50 }, { name: 'Demolitions', value: 40 },
            { name: 'Firearms', value: 60 }, { name: 'Foreign Language', value: 40 }, { name: 'Heavy Weapons', value: 50 },
            { name: 'HUMINT', value: 30 }, { name: 'Melee Weapons', value: 50 }, { name: 'Military Science', value: 50 },
            { name: 'Navigate', value: 50 }, { name: 'Persuade', value: 40 }, { name: 'Stealth', value: 50 },
            { name: 'Survival', value: 50 }, { name: 'Swim', value: 40 }, { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 1,
        bonusSkillAdvancements: 4,
        ranks: ["Probationary Operator", "Field Operator", "Senior Operator", "Team Leader", "Operational Chief", "Chief of Special Activities"],
        source: "The Complex",
        page: 152,
        equipmentKit: ['CIA SAD/SOG OPERATOR'],
        isDepartment: true,
        eligibleProfessions: ['Special Operator', 'Intelligence Case Officer'],
        specialTrainings: ['Parachuting', 'Advanced Interrogation']
    },
    {
        name: 'CIA SAD/PAG Officer',
        infoId: 'agency_cia',
        description: "A specialist in the CIA's Political Action Group, focused on psychological warfare, covert influence, and destabilization operations.",
        group: 'Federal Agent',
        recommendedStats: ['INT', 'CHA'],
        professionalSkills: [
            { name: 'Accounting', value: 40 }, { name: 'Anthropology', value: 40 }, { name: 'Athletics', value: 40 },
            { name: 'Bureaucracy', value: 60 }, { name: 'Disguise', value: 40 }, { name: 'Firearms', value: 40 },
            { name: 'Foreign Language', value: 50 }, { name: 'Foreign Language', value: 50 }, { name: 'Foreign Language', value: 40 },
            { name: 'History', value: 40 }, { name: 'HUMINT', value: 50 }, { name: 'Law', value: 40 },
            { name: 'Persuade', value: 50 }, { name: 'Stealth', value: 50 }, { name: 'Unarmed Combat', value: 60 }
        ],
        choiceGroups: [],
        bonds: 1,
        bonusSkillAdvancements: 4,
        ranks: ["Junior Officer", "Case Officer", "Senior Case Officer", "Team Chief", "Branch Chief", "Deputy Director, Political Action Group"],
        source: "The Complex",
        page: 152,
        equipmentKit: ['CIA SAD/PAG OFFICER'],
        isDepartment: true,
        eligibleProfessions: ['Intelligence Case Officer', 'Foreign Service Officer', 'Media Specialist'],
    },
    {
        name: 'EPA CID Special Agent',
        infoId: 'agency_epa',
        description: "A sworn federal law enforcement officer investigating willful violations of environmental laws.",
        group: 'Federal Agent',
        recommendedStats: ['INT', 'CON'],
        professionalSkills: [
            { name: 'Drive', value: 40 }, { name: 'Firearms', value: 40 }, { name: 'Forensics', value: 40 },
            { name: 'HUMINT', value: 50 }, { name: 'Law', value: 30 }, { name: 'Persuade', value: 50 },
            { name: 'Science', value: 40 }, { name: 'Search', value: 50 }
        ],
        choiceGroups: [],
        bonds: 4,
        bonusSkillAdvancements: 8,
        ranks: ["Special Agent", "Senior Special Agent", "Resident Agent in Charge", "Assistant Special Agent in Charge", "Special Agent in Charge", "Director, Criminal Investigation Division"],
        source: "The Complex",
        page: 163,
        equipmentKit: ['EPA CID SPECIAL AGENT'],
        isDepartment: true,
        eligibleProfessions: ['Federal Agent', 'Police Officer', 'Scientist'],
    },
    {
        name: 'EPA Regional Specialist',
        infoId: 'agency_epa',
        description: "An inspector or engineer sent from a regional office to investigate environmental trouble sites.",
        group: 'Civilian Specialist',
        recommendedStats: ['INT'],
        professionalSkills: [
            { name: 'Alertness', value: 60 }, { name: 'Bureaucracy', value: 40 }, { name: 'Forensics', value: 40 },
            { name: 'Law', value: 40 }, { name: 'Science', value: 60 }, { name: 'Science', value: 50 },
            { name: 'Science', value: 50 }, { name: 'Search', value: 60 }
        ],
        choiceGroups: [],
        bonds: 4,
        bonusSkillAdvancements: 8,
        ranks: ["Environmental Protection Specialist", "Senior Specialist", "Team Lead", "Branch Chief", "Division Director", "Regional Administrator"],
        source: "The Complex",
        page: 163,
        equipmentKit: ['SCIENTIST / MEDICAL KIT'],
        isDepartment: true,
        eligibleProfessions: ['Scientist', 'Program Manager', 'Computer Scientist or Engineer'],
    }
];

const BASE_PROFESSIONS_WITH_INFO = attachCoreProfessionInfoIds(BASE_PROFESSIONS);

export const CORE_PROFESSION_INFORMATION = buildCoreProfessionInformation(BASE_PROFESSIONS_WITH_INFO);

export const PROFESSIONS: Profession[] = [
    ...BASE_PROFESSIONS_WITH_INFO,
    ...buildComplexProfessions(BASE_PROFESSIONS_WITH_INFO),
];
