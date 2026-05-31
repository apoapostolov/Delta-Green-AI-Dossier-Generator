// departments-data/epa.ts
import type { Department } from '../types';

export const epaDepartments: Department[] = [
    {
        stub: 'epa_oceft',
        name: 'EPA, Office of Criminal Enforcement, Forensics and Training (OCEFT)',
        agency: 'Environmental Protection Agency',
        description: 'Investigates the most significant and egregious violations of environmental laws that pose a risk to human health and the environment. EPA Special Agents are fully sworn federal law enforcement officers.',
        country: 'United States of America',
        rank_order: 60,
        yearOfEstablishment: 1982,
        info: { powers_of_arrest: 'Full federal arrest powers for environmental crimes.', carry_of_weapon: 'Authorized to carry firearms.', access_to_funds: { maximum_request: 'Unusual', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to advanced environmental forensics labs, hazardous material handling equipment, and substantial budgets for long-term corporate investigations.' },
        wikipedia_url: 'https://www.epa.gov/enforcement/criminal-enforcement',
        professions: ['Federal Agent', 'Scientist'],
        suggested_bonus_skills: ['Forensics', 'Science', 'Law', 'Search', 'Criminology'],
        equipment: ['standard_sidearm', 'hazmat_suit', 'evidence_collection_kit', 'water_and_soil_sampler'],
        ranks: {
            'Federal Agent': ['Special Agent', 'Senior Special Agent', 'Resident Agent in Charge', 'Assistant Special Agent in Charge', 'Special Agent in Charge', 'Director, Criminal Investigation Division'],
            'Scientist': ['Forensic Scientist', 'Senior Forensic Scientist', 'Lab Supervisor', 'Chief, National Enforcement Investigations Center', 'Deputy Director, OCEFT', 'Director, OCEFT']
        },
        source: "Delta Green Agent's Handbook",
        page: 163,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_epa',
        specialTrainings: ['Hazmat Containment', 'Forensic Accounting']
    },
    {
        stub: 'epa_ro',
        name: 'EPA, Regional Office Specialist',
        agency: 'Environmental Protection Agency',
        description: 'Works within one of the EPA\'s 10 regional offices, responsible for executing the agency\'s programs, conducting inspections, and working with state and local governments on environmental issues.',
        country: 'United States of America',
        rank_order: 61,
        yearOfEstablishment: 1970,
        info: { powers_of_arrest: 'None (typically a non-law enforcement role).', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to environmental monitoring equipment, government databases, and regulatory enforcement tools. Budget for local grants and studies.' },
        wikipedia_url: 'https://www.epa.gov/aboutepa/visiting-regional-office',
        professions: ['Program Manager', 'Scientist'],
        suggested_bonus_skills: ['Bureaucracy', 'Science', 'Law', 'Persuade', 'Accounting'],
        equipment: ['monitoring_equipment', 'government_vehicle', 'case_files', 'code_of_federal_regulations'],
        ranks: {
            'Program Manager': ['Environmental Protection Specialist', 'Senior Specialist', 'Section Chief', 'Branch Chief', 'Division Director', 'Regional Administrator'],
            'Scientist': ['Environmental Scientist', 'Senior Scientist', 'Team Leader', 'Branch Chief', 'Division Director', 'Regional Administrator']
        },
        source: "Delta Green Agent's Handbook",
        page: 163,
        equipmentKit: ["SCIENTIST / MEDICAL KIT"],
        infoId: 'agency_epa',
        specialTrainings: ['Hazmat Containment']
    },
];