// departments-data/dos.ts
import type { Department } from '../types';

export const dosDepartments: Department[] = [
    {
        stub: 'dos_bds',
        name: 'DoS, Bureau of Diplomatic Security (DS)',
        agency: 'U.S. Department of State',
        description: 'The law enforcement and security arm of the Department of State. DS is responsible for protecting U.S. diplomats and embassies, as well as investigating visa and passport fraud.',
        country: 'United States of America',
        rank_order: 30,
        yearOfEstablishment: 1985,
        info: { powers_of_arrest: 'Full federal arrest powers, focused on crimes related to passport/visa fraud and threats against diplomats.', carry_of_weapon: 'Authorized to carry firearms on and off duty.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'On Request' }, budget_and_restricted_items: 'Significant budget for embassy security upgrades, armored vehicles, and protective details. Extensive global logistics network.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Diplomatic_Security_Service',
        professions: ['Federal Agent', 'Foreign Service Officer'],
        suggested_bonus_skills: ['Firearms', 'HUMINT', 'Persuade', 'Drive', 'Alertness'],
        equipment: ['standard_sidearm', 'armored_suv', 'diplomatic_passport', 'secure_comm_device'],
        ranks: {
            'Federal Agent': ['Special Agent', 'Senior Special Agent', 'Assistant Regional Security Officer (ARSO)', 'Regional Security Officer (RSO)', 'Deputy Assistant Secretary', 'Principal Deputy Assistant Secretary'],
            'Foreign Service Officer': ['Security Engineering Officer', 'Senior Security Engineer', 'ARSO-E', 'RSO-E', 'Office Director', 'Deputy Assistant Secretary']
        },
        source: "Delta Green Agent's Handbook",
        page: 156,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_dos',
        specialTrainings: ['Protective Detail', 'Defensive Driving']
    },
    {
        stub: 'dos_ir',
        name: 'DoS, Bureau of Intelligence and Research (INR)',
        agency: 'U.S. Department of State',
        description: 'An intelligence agency within the Department of State that provides all-source analysis to U.S. diplomats, primarily drawing on open-source and diplomatic reporting.',
        country: 'United States of America',
        rank_order: 12,
        yearOfEstablishment: 1946,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to diplomatic cables, foreign service reporting, and intelligence community databases. Budget is primarily for personnel and analysis tools.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Bureau_of_Intelligence_and_Research',
        professions: ['Intelligence Analyst', 'Foreign Service Officer'],
        suggested_bonus_skills: ['History', 'Foreign Language', 'HUMINT', 'Bureaucracy', 'Anthropology'],
        equipment: ['secure_workstation', 'diplomatic_cables', 'foreign_newspapers', 'ts_sci_credentials'],
        ranks: {
            'Intelligence Analyst': ['Foreign Affairs Analyst', 'Senior Analyst', 'Division Chief', 'Office Director', 'Deputy Assistant Secretary', 'Assistant Secretary of State for INR'],
            'Foreign Service Officer': ['INR Desk Officer', 'Senior Desk Officer', 'Division Chief', 'Office Director', 'Deputy Assistant Secretary', 'Assistant Secretary of State for INR']
        },
        source: "Delta Green Agent's Handbook",
        page: 156,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_dos',
        specialTrainings: ['Covert Communications']
    },
    {
        stub: 'dos_inl',
        name: 'DoS, Bureau of International Narcotics and Law Enforcement Affairs (INL)',
        agency: 'U.S. Department of State',
        description: 'Leads U.S. government efforts to combat international narcotics and crime by providing training, equipment, and support to foreign law enforcement agencies.',
        country: 'United States of America',
        rank_order: 41,
        yearOfEstablishment: 1978,
        info: { powers_of_arrest: 'None. Acts in an advisory and support capacity.', carry_of_weapon: 'Not authorized for most personnel; some security advisors may be.', access_to_funds: { maximum_request: 'Extreme', access_protocol: 'Limited' }, budget_and_restricted_items: 'Manages massive foreign aid packages, including vehicles, aircraft, and tactical equipment for partner nations. Can embed with foreign police units.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Bureau_of_International_Narcotics_and_Law_Enforcement_Affairs',
        professions: ['Program Manager', 'Foreign Service Officer'],
        suggested_bonus_skills: ['Bureaucracy', 'Persuade', 'Law', 'Foreign Language', 'HUMINT'],
        equipment: ['foreign_aid_contracts', 'diplomatic_pouch', 'briefing_books', 'armored_land_cruiser'],
        ranks: {
            'Program Manager': ['Program Officer', 'Senior Program Officer', 'Team Lead', 'Office Director', 'Deputy Assistant Secretary', 'Assistant Secretary of State for INL'],
            'Foreign Service Officer': ['INL Officer', 'Senior INL Officer', 'Team Lead', 'Office Director', 'Deputy Assistant Secretary', 'Assistant Secretary of State for INL']
        },
        source: "Delta Green Agent's Handbook",
        page: 156,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_dos',
        specialTrainings: ['Black Markets', 'Physical Surveillance']
    },
    {
        stub: 'dos_wha',
        name: 'DoS, Bureau of Western Hemisphere Affairs (WHA)',
        agency: 'U.S. Department of State',
        description: 'Manages diplomatic relations between the U.S. and countries in the Western Hemisphere. WHA is composed of country desk officers and policy specialists.',
        country: 'United States of America',
        rank_order: 40,
        yearOfEstablishment: 1909,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Budget for diplomatic functions, foreign aid administration, and public diplomacy initiatives. Access to sensitive diplomatic reporting.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Bureau_of_Western_Hemisphere_Affairs',
        professions: ['Foreign Service Officer', 'Program Manager'],
        suggested_bonus_skills: ['Persuade', 'History', 'Foreign Language', 'Bureaucracy', 'Anthropology'],
        equipment: ['diplomatic_credentials', 'country_briefing_files', 'secure_phone', 'formal_wear'],
        ranks: {
            'Foreign Service Officer': ['Desk Officer', 'Senior Desk Officer', 'Political Section Chief', 'Office Director', 'Deputy Assistant Secretary', 'Assistant Secretary of State for WHA'],
            'Program Manager': ['Program Officer', 'Senior Program Officer', 'Team Lead', 'Office Director', 'Deputy Assistant Secretary', 'Assistant Secretary of State for WHA']
        },
        source: "Delta Green Agent's Handbook",
        page: 156,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_dos',
        specialTrainings: ['Covert Communications']
    },
    {
        stub: 'dos_dcs',
        name: 'Diplomatic Courier Service',
        agency: 'U.S. Department of State',
        description: 'Responsible for the secure transport of classified and sensitive materials between U.S. embassies, consulates, and the Department of State.',
        country: 'United States of America',
        rank_order: 35,
        yearOfEstablishment: 1918,
        info: { powers_of_arrest: 'Limited federal arrest powers, specifically to protect the diplomatic pouch.', carry_of_weapon: 'Authorized to carry firearms concealed.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Access to diplomatic passports, secure transport containers, and commercial or government transport worldwide. The diplomatic pouch they carry is inviolable under international law.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Diplomatic_Courier_Service',
        professions: ['Federal Agent'],
        suggested_bonus_skills: ['Alertness', 'Drive', 'Navigate', 'Stealth', 'Foreign Language'],
        equipment: ['concealed_handgun', 'diplomatic_pouch', 'multiple_passports', 'go_bag'],
        ranks: {
            'Federal Agent': ['Diplomatic Courier', 'Senior Courier', 'Regional Courier Supervisor', 'Hub Chief', 'Deputy Director', 'Director of the Diplomatic Courier Service']
        },
        source: "Delta Green Agent's Handbook",
        page: 156,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_dos',
        specialTrainings: ['Defensive Driving', 'Counter-Surveillance']
    },
];