// departments-data/fbi.ts
import type { Department } from '../types';

export const fbiDepartments: Department[] = [
    {
        stub: 'fbi_cid',
        name: 'FBI, Criminal Investigative Division (CID)',
        agency: 'Federal Bureau of Investigation',
        infoId: 'agency_fbi',
        description: "The CID is the FBI's largest division, responsible for investigating a wide range of federal crimes, including organized crime, white-collar crime, public corruption, and violent crime.",
        country: 'United States of America',
        rank_order: 20,
        yearOfEstablishment: 1908,
        info: { powers_of_arrest: "Full federal arrest powers for violations of U.S. federal law.", carry_of_weapon: "Authorized to carry firearms on and off duty.", access_to_funds: { maximum_request: 'Major', access_protocol: 'Limited' }, budget_and_restricted_items: "Access to extensive forensic services, surveillance equipment, and informant funds. Requests for heavy tactical gear are handled by specialized units like HRT." },
        wikipedia_url: 'https://en.wikipedia.org/wiki/FBI_Criminal,_Cyber,_Response,_and_Services_Branch',
        professions: ['Federal Agent'],
        suggested_bonus_skills: ['Criminology', 'Forensics', 'HUMINT', 'Law', 'Search'],
        equipment: ['standard_sidearm', 'badge_credentials', 'unmarked_sedan', 'forensic_kit'],
        ranks: {
            'Federal Agent': ['New Agent Trainee (NAT)', 'Special Agent', 'Senior Resident Agent', 'Supervisory Special Agent (SSA)', 'Assistant Special Agent in Charge (ASAC)', 'Special Agent in Charge (SAC)']
        },
        source: "The Complex",
        page: 113,
        equipmentKit: ['FEDERAL AGENT'],
        specialTrainings: ['Forensic Accounting', 'Advanced Interrogation']
    },
    {
        stub: 'fbi_di',
        name: 'FBI, Directorate of Intelligence',
        agency: 'Federal Bureau of Investigation',
        infoId: 'agency_fbi',
        description: 'Drives the FBI\'s intelligence cycle, collecting and analyzing intelligence to support all FBI operational programs and disseminating information to partners in the Intelligence Community.',
        country: 'United States of America',
        rank_order: 11,
        yearOfEstablishment: 2005,
        info: { powers_of_arrest: 'None (analytical role).', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Access to all FBI case files, informant reports, and signals intelligence. Produces intelligence reports for internal and external consumption.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/FBI_Intelligence_Branch',
        professions: ['Intelligence Analyst', 'Intelligence Case Officer'],
        suggested_bonus_skills: ['Criminology', 'Forensics', 'Firearms', 'Law'],
        equipment: ['secure_workstation', 'intelligence_databases', 'analytical_software', 'top_secret_clearance', 'language_training_materials', 'electronic_surveillance_equipment'],
        ranks: {
            'Intelligence Analyst': ['Intelligence Analyst', 'Senior Intelligence Analyst', 'Supervisory Intelligence Analyst', 'Section Chief', 'Deputy Assistant Director', 'Executive Assistant Director, DI']
        },
        source: "The Complex",
        page: 113,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        specialTrainings: ['Technical Surveillance Counter-Measures (TSCM)']
    },
    {
        stub: 'fbi_ioss',
        name: 'FBI, Intelligence and Operations Support Section',
        agency: 'Federal Bureau of Investigation',
        infoId: 'agency_fbi',
        description: 'A component of the Directorate of Intelligence, providing direct, embedded analytical support to operational squads in criminal and national security investigations.',
        country: 'United States of America',
        rank_order: 22,
        yearOfEstablishment: 2005,
        info: { powers_of_arrest: 'None (analytical role).', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Direct access to raw intelligence and operational case files. Works alongside Special Agents to provide real-time analytical support.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/FBI_Intelligence_Branch',
        professions: ['Computer Scientist or Engineer', 'Intelligence Case Officer', 'Physician', 'Scientist'],
        suggested_bonus_skills: ['Computer Science', 'HUMINT', 'Psychotherapy', 'Science'],
        equipment: ['field_laptop', 'case_files', 'evidence_analysis_tools', 'raid_jacket', 'An extensive professional library', 'membership in ViCAP', 'access to cutting edge criminological software'],
        ranks: {
            'Intelligence Analyst': ['Operational Support Analyst', 'Senior Analyst', 'Supervisory Analyst (Embedded)', 'Unit Chief', 'Section Chief', 'Deputy Assistant Director']
        },
        source: "The Complex",
        page: 113,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        specialTrainings: ['Advanced Interrogation']
    },
    {
        stub: 'fbi_nsb',
        name: 'FBI, National Security Branch (NSB)',
        agency: 'Federal Bureau of Investigation',
        infoId: 'agency_fbi',
        description: "The NSB integrates the FBI's national security missions, focusing on counterterrorism, counterintelligence, and weapons of mass destruction.",
        country: 'United States of America',
        rank_order: 21,
        yearOfEstablishment: 2005,
        info: { powers_of_arrest: "Full federal arrest powers, primarily focused on national security threats.", carry_of_weapon: "Authorized to carry firearms.", access_to_funds: { maximum_request: 'Major', access_protocol: 'Limited' }, budget_and_restricted_items: "Access to the full suite of FBI resources, with a focus on counter-espionage technology and collaboration with foreign intelligence services." },
        wikipedia_url: 'https://en.wikipedia.org/wiki/FBI_National_Security_Branch',
        professions: ['Federal Agent', 'Intelligence Analyst', 'Intelligence Case Officer'],
        suggested_bonus_skills: ['HUMINT', 'SIGINT', 'Computer Science', 'Foreign Language'],
        equipment: ['standard_sidearm', 'encrypted_laptop', 'bug-out_bag', 'false_id_kit', 'portable hardened laptop', 'advanced data analysis software', 'chemical sniffer/analyzer'],
        ranks: {
            'Federal Agent': ['Special Agent, Counterintelligence', 'Senior CI Agent', 'Supervisory Special Agent, CI', 'Unit Chief, Counter-espionage', 'Section Chief, NSB', 'Executive Assistant Director, NSB'],
            'Intelligence Analyst': ['NSB Analyst', 'Senior NSB Analyst', 'Supervisory Analyst, Counterterrorism', 'Unit Chief, WMD Directorate', 'Section Chief, NSB', 'Executive Assistant Director, NSB'],
            'Intelligence Case Officer': ['Special Agent, NSB', 'Senior Field Agent', 'Supervisory Special Agent, HUMINT', 'Unit Chief, Foreign Visitor Program', 'Section Chief, NSB', 'Executive Assistant Director, NSB']
        },
        source: "The Complex",
        page: 113,
        equipmentKit: ['FEDERAL AGENT'],
        specialTrainings: ['Advanced Interrogation', 'Technical Surveillance Counter-Measures (TSCM)']
    },
    {
        stub: 'fbi_hrt_swat',
        name: 'FBI, Hostage Rescue Team (HRT) / SWAT',
        agency: 'Federal Bureau of Investigation',
        infoId: 'agency_fbi',
        description: 'The FBI\'s elite tactical units. SWAT teams are attached to field offices for local high-risk operations, while HRT is the national-level, tier-one counter-terrorism unit.',
        country: 'United States of America',
        rank_order: 5,
        yearOfEstablishment: 1983,
        info: { powers_of_arrest: 'Full federal arrest powers, exercised in tactical environments.', carry_of_weapon: 'Authorized to carry and deploy a wide range of specialized tactical weaponry.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'On Request' }, budget_and_restricted_items: 'Highest priority for advanced military-grade weapons, surveillance tools, breaching equipment, and dedicated aircraft.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Hostage_Rescue_Team',
        professions: ['FBI HRT/SWAT Operator'],
        suggested_bonus_skills: ['Firearms', 'Demolitions', 'Athletics', 'Stealth', 'Melee Weapons', 'Criminology'],
        equipment: ['custom_m4_carbine', 'tactical_pistol', 'heavy_body_armor', 'breaching_shotgun', 'specially-designed computer with access to IAFIS and ABIS'],
        ranks: {
            'Special Operator': ['HRT Candidate', 'Assaulter / Operator', 'Senior Operator', 'Team Leader', 'Unit Chief', 'Commander, HRT'],
            'Federal Agent': ['SWAT Operator', 'Senior SWAT Operator', 'SWAT Team Leader', 'Field Office SWAT Coordinator', 'Unit Chief, Tactical Section', 'Commander, HRT']
        },
        source: "The Complex",
        page: 113,
        equipmentKit: ['SWAT TEAM'],
        specialTrainings: ['Tear Gas & Stun Grenades', 'Explosive Entry / Breaching']
    },
];