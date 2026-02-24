// departments-data/ice.ts
import type { Department } from '../types';

export const iceDepartments: Department[] = [
    {
        stub: 'ice_hsi',
        name: 'ICE, Homeland Security Investigations (HSI)',
        agency: 'Immigration and Customs Enforcement',
        description: 'The primary investigative arm of the Department of Homeland Security, responsible for investigating transnational crime and threats, including smuggling, trafficking, and cybercrime.',
        country: 'United States of America',
        rank_order: 36,
        yearOfEstablishment: 2003,
        info: { powers_of_arrest: 'Full federal arrest powers for a wide range of customs and immigration laws.', carry_of_weapon: 'Authorized to carry firearms.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to customs databases, border surveillance technology, and significant asset forfeiture funds.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Homeland_Security_Investigations',
        professions: ['Federal Agent'],
        suggested_bonus_skills: ['Law', 'HUMINT', 'Criminology', 'Search', 'Foreign Language'],
        equipment: ['standard_sidearm', 'flex_cuffs', 'border_patrol_vehicle', 'contraband_test_kit'],
        ranks: {
            'Federal Agent': ['Special Agent', 'Senior Special Agent', 'Group Supervisor', 'Assistant Special Agent in Charge (ASAC)', 'Special Agent in Charge (SAC)', 'Executive Associate Director, HSI']
        },
        source: "Delta Green Agent's Handbook",
        page: 121,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_ice',
        specialTrainings: ['Black Markets', 'Forensic Accounting']
    },
    {
        stub: 'ice_hsi_intel',
        name: 'ICE, HSI / Intelligence',
        agency: 'Immigration and Customs Enforcement',
        description: 'The intelligence component of HSI, collecting and analyzing information to identify and target criminal organizations that exploit U.S. immigration and customs laws.',
        country: 'United States of America',
        rank_order: 37,
        yearOfEstablishment: 2003,
        info: { powers_of_arrest: 'None (analytical role).', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to DHS and Treasury Department databases, informant reports from field agents, and international law enforcement data.' },
        wikipedia_url: 'https://www.ice.gov/about-ice/homeland-security-investigations/intelligence',
        professions: ['Intelligence Analyst'],
        suggested_bonus_skills: ['SIGINT', 'Accounting', 'Computer Science', 'Law', 'HUMINT'],
        equipment: ['secure_workstation', 'link_analysis_software', 'financial_records', 'shipping_manifests'],
        ranks: {
            'Intelligence Analyst': ['Intelligence Research Specialist', 'Senior IRS', 'Supervisory IRS', 'Unit Chief', 'Section Chief', 'Director of Intelligence, HSI']
        },
        source: "Delta Green Agent's Handbook",
        page: 121,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_ice',
        specialTrainings: ['Forensic Accounting']
    },
    {
        stub: 'ice_ero',
        name: 'ICE, Enforcement and Removal Operations (ERO)',
        agency: 'Immigration and Customs Enforcement',
        description: 'Responsible for identifying, arresting, and removing aliens who present a danger to national security or public safety, or who have otherwise violated immigration laws.',
        country: 'United States of America',
        rank_order: 38,
        yearOfEstablishment: 2003,
        info: { powers_of_arrest: 'Federal arrest powers for civil immigration violations.', carry_of_weapon: 'Authorized to carry firearms.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Budget focused on detention facilities, transportation, and fugitive apprehension operations.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/U.S._Immigration_and_Customs_Enforcement#Enforcement_and_Removal_Operations_(ERO)',
        professions: ['Federal Agent'],
        suggested_bonus_skills: ['Law', 'HUMINT', 'Alertness', 'Persuade', 'Drive'],
        equipment: ['standard_sidearm', 'restraints', 'transport_van', 'body_armor'],
        ranks: {
            'Federal Agent': ['Deportation Officer', 'Supervisory Deportation Officer', 'Assistant Field Office Director', 'Field Office Director', 'Deputy Executive Associate Director', 'Executive Associate Director, ERO']
        },
        source: "Delta Green Agent's Handbook",
        page: 121,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_ice',
        specialTrainings: ['Advanced Interrogation']
    },
    {
        stub: 'ice_srt',
        name: 'ICE, Special Response Team (SRT)',
        agency: 'Immigration and Customs Enforcement',
        description: 'The tactical arm of ICE, providing specialized support for high-risk warrants, fugitive apprehensions, and responding to critical incidents at ICE facilities.',
        country: 'United States of America',
        rank_order: 17,
        yearOfEstablishment: 2006,
        info: { powers_of_arrest: 'Federal arrest powers, exercised in tactical situations.', carry_of_weapon: 'Authorized to carry and deploy specialized tactical weaponry.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Access to tactical gear, armored vehicles, and advanced breaching tools.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Special_Response_Team#U.S._Immigration_and_Customs_Enforcement_(ICE)',
        professions: ['Special Operator', 'Federal Agent'],
        suggested_bonus_skills: ['Firearms', 'Athletics', 'Melee Weapons', 'Demolitions', 'Alertness'],
        equipment: ['tactical_carbine', 'body_armor', 'breaching_ram', 'riot_shield'],
        ranks: {
            'Special Operator': ['SRT Operator', 'Senior SRT Operator', 'SRT Team Leader', 'SRT Commander', 'Field Office SRT Coordinator', 'National SRT Coordinator'],
            'Federal Agent': ['SRT Operator', 'Senior SRT Operator', 'SRT Team Leader', 'SRT Commander', 'Field Office SRT Coordinator', 'National SRT Coordinator']
        },
        source: "Delta Green Agent's Handbook",
        page: 121,
        equipmentKit: ['SWAT TEAM'],
        infoId: 'agency_ice',
        specialTrainings: ['Tear Gas & Stun Grenades', 'Explosive Entry / Breaching']
    },
];