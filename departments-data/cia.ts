// departments-data/cia.ts
import type { Department } from '../types';

export const ciaDepartments: Department[] = [
    {
        stub: 'cia_da',
        name: 'CIA, Directorate of Analysis',
        agency: 'Central Intelligence Agency',
        description: 'The analytical arm of the CIA, responsible for producing and disseminating all-source intelligence analysis on foreign and transnational issues.',
        country: 'United States of America',
        rank_order: 10,
        yearOfEstablishment: 1947,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Generally not authorized, especially domestically.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Access to immense, classified intelligence databases (JWICS, SIPRNet), satellite imagery, and signals intelligence intercepts.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Directorate_of_Analysis',
        professions: ['Intelligence Analyst'],
        suggested_bonus_skills: ['SIGINT', 'History', 'Foreign Language', 'Computer Science', 'Science'],
        equipment: ['encrypted_laptop', 'ts_sci_credentials', 'soundproofed_office', 'dossier_briefs'],
        ranks: {
            'Intelligence Analyst': ['Analyst (GS-10)', 'Senior Analyst (GS-12)', 'Reports Officer (GS-13)', 'Group Chief (GS-14)', 'Deputy Director, Office of Analysis (GS-15)', 'Director, Office of Analysis (SIS)']
        },
        source: "Delta Green Agent's Handbook",
        page: 152,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_cia',
        specialTrainings: ['Technical Surveillance Counter-Measures (TSCM)']
    },
    {
        stub: 'cia_ncs',
        name: 'CIA, National Clandestine Service',
        agency: 'Central Intelligence Agency',
        description: 'The operational arm of the CIA, responsible for collecting human intelligence (HUMINT) covertly and conducting covert action as directed by the President.',
        country: 'United States of America',
        rank_order: 4,
        yearOfEstablishment: 1947,
        info: { powers_of_arrest: 'No domestic arrest powers. Authority overseas is complex and situation-dependent.', carry_of_weapon: 'Authorized to carry firearms in operational settings, often sterile and untraceable.', access_to_funds: { maximum_request: 'Extreme', access_protocol: 'Unlimited' }, budget_and_restricted_items: 'Vast, often unaudited budget for operational needs, including paying assets, establishing cover identities, and acquiring specialized, non-attributable gear.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/National_Clandestine_Service',
        professions: ['Intelligence Case Officer'],
        suggested_bonus_skills: ['HUMINT', 'Persuade', 'Disguise', 'Foreign Language', 'Stealth'],
        equipment: ['sterile_sidearm', 'covert_comm_device', 'forged_passport', 'escape_and_evasion_kit'],
        ranks: {
            'Intelligence Case Officer': ['Career Trainee (CST)', 'Operations Officer', 'Supervisory Operations Officer', 'Deputy Chief of Station', 'Chief of Station', 'Senior Intelligence Service (SIS)']
        },
        source: "Delta Green Agent's Handbook",
        page: 152,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_cia',
        specialTrainings: ['Advanced Interrogation', 'Covert Communications']
    },
    {
        stub: 'cia_sad_pag',
        name: 'CIA, SAD/Political Action Group',
        agency: 'Central Intelligence Agency',
        description: 'A component of the Special Activities Division responsible for covert political action, psychological operations (PSYOPS), and influencing foreign political outcomes.',
        country: 'United States of America',
        rank_order: 3,
        yearOfEstablishment: 1947,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized as needed for operational security.', access_to_funds: { maximum_request: 'Extreme', access_protocol: 'Unlimited' }, budget_and_restricted_items: 'Access to black budgets, untraceable currency, and media assets for disseminating propaganda. Can requisition technical and logistical support from other directorates.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Special_Activities_Center',
        professions: ['Intelligence Case Officer'],
        suggested_bonus_skills: ['Persuade', 'HUMINT', 'Bureaucracy', 'Art', 'History'],
        equipment: ['untraceable_funds', 'burner_phones', 'propaganda_leaflets', 'cover_identity'],
        ranks: {
            'Intelligence Case Officer': ['PAG Trainee', 'Covert Action Officer', 'Senior Covert Action Officer', 'Team Leader', 'Group Chief', 'Chief, Political Action Group']
        },
        source: "Delta Green Agent's Handbook",
        page: 152,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_cia',
        specialTrainings: ['Advanced Interrogation', 'Covert Communications']
    },
    {
        stub: 'cia_sad_sog',
        name: 'CIA, SAD/Special Operations Group',
        agency: 'Central Intelligence Agency',
        description: 'A component of the Special Activities Division, the SOG is the CIA\'s paramilitary arm, recruiting from elite U.S. special operations forces to conduct high-threat covert operations.',
        country: 'United States of America',
        rank_order: 2,
        yearOfEstablishment: 1947,
        info: { powers_of_arrest: 'None. Primary mission is direct action, not law enforcement.', carry_of_weapon: 'Authorized to carry a wide array of U.S. and foreign military weapons.', access_to_funds: { maximum_request: 'Extreme', access_protocol: 'On Request' }, budget_and_restricted_items: 'Extensive budget for military-grade hardware, aircraft, and untraceable weapons. Can requisition support from JSOC.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Special_Activities_Center',
        professions: ['Special Operator', 'Intelligence Case Officer'],
        suggested_bonus_skills: ['Firearms', 'Demolitions', 'Stealth', 'Military Science', 'Heavy Weapons'],
        equipment: ['custom_carbine', 'suppressed_pistol', 'night_vision_goggles', 'breaching_charges'],
        ranks: {
            'Special Operator': ['Operations Trainee', 'Paramilitary Operations Officer', 'Senior Operations Officer', 'Team Leader', 'Ground Branch Chief', 'SAD Chief of Operations'],
            'Intelligence Case Officer': ['SOG Case Officer', 'Senior Case Officer', 'Team Leader, Clandestine Ops', 'Deputy Group Chief', 'Group Chief', 'SAD Chief of Operations']
        },
        source: "Delta Green Agent's Handbook",
        page: 152,
        equipmentKit: ['SPECIAL OPERATOR'],
        infoId: 'agency_cia',
        specialTrainings: ['Parachuting', 'Advanced Interrogation']
    },
];