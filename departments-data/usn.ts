// departments-data/usn.ts
import type { Department } from '../types';

export const usnDepartments: Department[] = [
    {
        stub: 'usn_ncis',
        name: 'U.S. Navy, NCIS',
        agency: 'U.S. Navy',
        description: 'The Naval Criminal Investigative Service is the primary law enforcement and counterintelligence arm of the Department of the Navy, investigating felony crimes and security threats.',
        country: 'United States of America',
        rank_order: 39,
        yearOfEstablishment: 1992,
        info: { powers_of_arrest: 'Full federal arrest powers for crimes under the Uniform Code of Military Justice (UCMJ) and U.S. Code.', carry_of_weapon: 'Authorized to carry firearms.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to naval intelligence, forensic labs, and global naval bases. Investigates everything from homicide to cyber intrusions.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Naval_Criminal_Investigative_Service',
        professions: ['Federal Agent', 'Intelligence Analyst'],
        suggested_bonus_skills: ['Criminology', 'Law', 'HUMINT', 'Forensics', 'Computer Science'],
        equipment: ['standard_sidearm', 'ncis_credentials', 'forensic_kit', 'polygraph_access'],
        ranks: {
            'Federal Agent': ['Special Agent', 'Senior Special Agent', 'Supervisory Special Agent', 'Assistant Special Agent in Charge', 'Special Agent in Charge', 'Executive Assistant Director'],
            'Intelligence Analyst': ['Intelligence Analyst', 'Senior Intelligence Analyst', 'Supervisory Intelligence Analyst', 'Division Chief', 'Assistant Director', 'Executive Assistant Director']
        },
        source: "Delta Green Agent's Handbook",
        page: 135,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_usn',
        specialTrainings: ['Advanced Interrogation', 'Technical Surveillance Counter-Measures (TSCM)']
    },
    {
        stub: 'usn_eod',
        name: 'U.S. Navy, Explosive Ordnance Disposal (EOD)',
        agency: 'U.S. Navy',
        description: 'Navy EOD technicians are responsible for disarming, rendering safe, and disposing of explosive hazards, including conventional, chemical, biological, and nuclear ordnance, both on land and underwater.',
        country: 'United States of America',
        rank_order: 22,
        yearOfEstablishment: 1941,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry personal defense weapons.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Access to advanced bomb disposal robots, dive equipment, explosive containment chambers, and a wide array of specialized tools.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Explosive_ordnance_disposal_(United_States_Navy)',
        professions: ['Soldier or Marine', 'Special Operator'],
        suggested_bonus_skills: ['Demolitions', 'Craft', 'Science', 'Alertness', 'Swim'],
        equipment: ['bomb_suit', 'eod_robot', 'disarming_toolkit', 'combat_dive_gear'],
        ranks: {
            'Soldier or Marine': ['EOD Technician', 'Senior EOD Technician', 'Master EOD Technician', 'Platoon Leading Chief Petty Officer', 'Company Command Master Chief', 'Group Command Master Chief'],
            'Special Operator': ['EOD Technician', 'Senior EOD Technician', 'Master EOD Technician', 'Platoon Leading Chief Petty Officer', 'Company Command Master Chief', 'Group Command Master Chief']
        },
        source: "Delta Green Agent's Handbook",
        page: 135,
        equipmentKit: ["EOD KIT"],
        infoId: 'agency_usn',
        specialTrainings: ['SCUBA Gear', 'Explosive Entry / Breaching']
    },
    {
        stub: 'usn_hospital_corps',
        name: 'U.S. Navy, Hospital Corps',
        agency: 'U.S. Navy',
        description: 'Hospital Corpsmen are enlisted medical specialists who provide care to sailors and marines, from routine sick call to providing combat casualty care on the battlefield, often embedded with USMC units.',
        country: 'United States of America',
        rank_order: 44,
        yearOfEstablishment: 1898,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Generally not armed, as they are protected non-combatants, but may carry a sidearm when embedded with combat units.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to advanced field medical supplies, surgical kits, and CASEVAC procedures. Highly respected for their life-saving skills under fire.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Hospital_corpsman',
        professions: ['Nurse or Paramedic', 'Soldier or Marine'],
        suggested_bonus_skills: ['First Aid', 'Medicine', 'Surgery', 'Pharmacy', 'Athletics'],
        equipment: ['combat_trauma_bag', 'syrettes_of_morphine', 'tourniquets', 'suture_kit'],
        ranks: {
            'Nurse or Paramedic': ['Hospitalman', 'Hospital Corpsman 3rd Class', 'Hospital Corpsman 2nd Class', 'Hospital Corpsman 1st Class', 'Chief Hospital Corpsman', 'Master Chief Hospital Corpsman'],
            'Soldier or Marine': ['Hospitalman', 'Hospital Corpsman 3rd Class', 'Hospital Corpsman 2nd Class', 'Hospital Corpsman 1st Class', 'Chief Hospital Corpsman', 'Master Chief Hospital Corpsman']
        },
        source: "Delta Green Agent's Handbook",
        page: 135,
        equipmentKit: ["SCIENTIST / MEDICAL KIT"],
        infoId: 'agency_usn',
        specialTrainings: ['Epidemiological Field Work']
    },
    {
        stub: 'usn_devgru_seals',
        name: 'U.S. Navy, DEVGRU / SEALs',
        agency: 'U.S. Navy',
        description: 'The Navy\'s primary special operations forces. SEAL Teams conduct direct action and special reconnaissance in maritime environments, while DEVGRU (SEAL Team Six) is a Tier 1 unit focused on counter-terrorism and other high-stakes missions.',
        country: 'United States of America',
        rank_order: 0,
        yearOfEstablishment: 1962,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry a wide array of customized special operations weaponry.', access_to_funds: { maximum_request: 'Extreme', access_protocol: 'On Request' }, budget_and_restricted_items: 'Access to the best equipment money can buy, including miniature submarines, advanced weapons, and global intelligence support from JSOC.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/SEAL_Team_Six',
        professions: ['Special Operator'],
        suggested_bonus_skills: ['Firearms', 'Swim', 'Demolitions', 'Stealth', 'Survival'],
        equipment: ['hk416_rifle', 'combat_dive_rig', 'underwater_demolitions', 'suppressed_pistol'],
        ranks: {
            'Special Operator': ['SEAL Operator', 'Point Man / Breacher', 'Lead Petty Officer', 'Troop Chief', 'Squadron Command Master Chief', 'DEVGRU Command Master Chief']
        },
        source: "Delta Green Agent's Handbook",
        page: 145,
        equipmentKit: ['SPECIAL OPERATOR'],
        infoId: 'agency_socom',
        specialTrainings: ['Parachuting', 'SCUBA Gear', 'Advanced Interrogation', 'Explosive Entry / Breaching', 'Maritime Operations (VBSS)']
    },
];