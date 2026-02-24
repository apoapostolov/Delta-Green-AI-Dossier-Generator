// departments-data/dea.ts
import type { Department } from '../types';

export const deaDepartments: Department[] = [
    {
        stub: 'dea_ops',
        name: 'DEA, Operations Division',
        agency: 'Drug Enforcement Administration',
        description: 'The primary investigative and enforcement arm of the DEA, with field offices across the U.S. and in dozens of foreign countries, focused on disrupting drug trafficking organizations.',
        country: 'United States of America',
        rank_order: 31,
        yearOfEstablishment: 1973,
        info: { powers_of_arrest: 'Full federal arrest powers for violations of the Controlled Substances Act.', carry_of_weapon: 'Authorized to carry firearms; often involved in high-risk operations.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'Limited' }, budget_and_restricted_items: 'Substantial funding for informant payments, undercover operations, and asset forfeiture. Access to tactical gear for raids.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Drug_Enforcement_Administration',
        professions: ['Federal Agent'],
        suggested_bonus_skills: ['HUMINT', 'Criminology', 'Firearms', 'Pharmacy', 'Law'],
        equipment: ['standard_sidearm', 'tactical_entry_kit', 'evidence_bags', 'undercover_vehicle'],
        ranks: {
            'Federal Agent': ['Special Agent (Trainee)', 'Special Agent (GS-11)', 'Senior Special Agent (GS-12)', 'Group Supervisor (GS-13)', 'Assistant Special Agent in Charge (ASAC)', 'Special Agent in Charge (SAC)']
        },
        source: "Delta Green Agent's Handbook",
        page: 117,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_dea',
        specialTrainings: ['Advanced Interrogation', 'Black Markets']
    },
    {
        stub: 'dea_fast',
        name: 'DEA, Foreign-deployed Advisory and Support Teams (FAST)',
        agency: 'Drug Enforcement Administration',
        description: 'Elite, rapid-response teams that deploy to combat zones and unstable regions to investigate and dismantle narco-terrorist organizations linked to the U.S. drug trade.',
        country: 'United States of America',
        rank_order: 16,
        yearOfEstablishment: 2005,
        info: { powers_of_arrest: 'Limited to assisting host-nation partners with their law enforcement actions.', carry_of_weapon: 'Authorized to carry military-grade weaponry for force protection.', access_to_funds: { maximum_request: 'Major', access_protocol: 'On Request' }, budget_and_restricted_items: 'Military-style equipment, logistical support from DoD, and operational funds for working with foreign assets.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Foreign-deployed_Advisory_and_Support_Team',
        professions: ['Special Operator', 'Federal Agent'],
        suggested_bonus_skills: ['Firearms', 'Military Science', 'HUMINT', 'Survival', 'Foreign Language'],
        equipment: ['m4_carbine', 'body_armor', 'satellite_phone', 'first_aid_kit'],
        ranks: {
            'Special Operator': ['Team Member', 'Senior Team Member', 'Assistant Team Leader', 'Team Leader', 'FAST Country Manager', 'FAST Section Chief'],
            'Federal Agent': ['Team Member', 'Senior Team Member', 'Assistant Team Leader', 'Team Leader', 'FAST Country Manager', 'FAST Section Chief']
        },
        source: "Delta Green Agent's Handbook",
        page: 117,
        equipmentKit: ['SPECIAL OPERATOR'],
        infoId: 'agency_dea',
        specialTrainings: ['Advanced Interrogation', 'Black Markets']
    },
    {
        stub: 'dea_os',
        name: 'DEA, Operational Support Division',
        agency: 'Drug Enforcement Administration',
        description: 'Provides technical and administrative support for all DEA operations, including managing finances, logistics, and information systems.',
        country: 'United States of America',
        rank_order: 33,
        yearOfEstablishment: 1973,
        info: { powers_of_arrest: 'None (non-investigative role).', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Controls agency-wide procurement, information technology infrastructure, and administrative services.' },
        wikipedia_url: 'https://www.dea.gov/about/leadership/divisions/operational-support',
        professions: ['Program Manager', 'Intelligence Analyst'],
        suggested_bonus_skills: ['Bureaucracy', 'Accounting', 'Computer Science', 'Law'],
        equipment: ['agency_credentials', 'secure_workstation', 'budget_reports', 'endless_paperwork'],
        ranks: {
            'Program Manager': ['Program Analyst (GS-11)', 'Senior Program Analyst (GS-12)', 'Program Manager (GS-13)', 'Section Chief (GS-14)', 'Deputy Assistant Administrator (GS-15)', 'Assistant Administrator'],
            'Intelligence Analyst': ['Intelligence Research Specialist (GS-11)', 'Senior IRS (GS-12)', 'Supervisory IRS (GS-13)', 'Section Chief (GS-14)', 'Deputy Assistant Administrator (GS-15)', 'Assistant Administrator']
        },
        source: "Delta Green Agent's Handbook",
        page: 117,
        equipmentKit: ["CORPORATE KIT"],
        infoId: 'agency_dea'
    },
    {
        stub: 'dea_sod',
        name: 'DEA, Special Operations Division (SOD)',
        agency: 'Drug Enforcement Administration',
        description: 'A multi-agency intelligence center that coordinates complex, multi-jurisdictional drug trafficking investigations. It targets high-level command and control structures of major drug organizations.',
        country: 'United States of America',
        rank_order: 32,
        yearOfEstablishment: 1994,
        info: { powers_of_arrest: 'Coordinates arrests with field divisions; SOD personnel are typically analysts.', carry_of_weapon: 'Authorized, but rarely used in an analytical role.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to a vast, multi-agency database of wiretaps, financial records, and informant data. Can direct field assets from nearly any federal agency.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Special_Operations_Division',
        professions: ['Intelligence Analyst', 'Federal Agent'],
        suggested_bonus_skills: ['SIGINT', 'HUMINT', 'Accounting', 'Computer Science', 'Bureaucracy'],
        equipment: ['multi-screen_workstation', 'secure_phone_line', 'data_analysis_software', 'ts_sci_credentials'],
        ranks: {
            'Intelligence Analyst': ['Intelligence Research Specialist', 'Senior IRS', 'Supervisory IRS', 'Section Chief', 'Deputy Director, SOD', 'Director, SOD'],
            'Federal Agent': ['Liaison Officer', 'Senior Liaison Officer', 'Group Supervisor', 'Section Chief', 'Deputy Director, SOD', 'Director, SOD']
        },
        source: "Delta Green Agent's Handbook",
        page: 117,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_dea',
        specialTrainings: ['Technical Surveillance Counter-Measures (TSCM)', 'Forensic Accounting']
    },
];