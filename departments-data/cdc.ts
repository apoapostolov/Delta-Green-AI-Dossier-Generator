// departments-data/cdc.ts
import type { Department } from '../types';

export const cdcDepartments: Department[] = [
    {
        stub: 'cdc_ophss',
        name: 'CDC, Office of Public Health Scientific Services',
        agency: 'Centers for Disease Control and Prevention',
        description: 'Provides scientific leadership and services in epidemiology, public health surveillance, and laboratory services to protect and improve public health.',
        country: 'United States of America',
        rank_order: 50,
        yearOfEstablishment: 1946,
        info: { powers_of_arrest: 'None. Can request quarantine orders through federal courts.', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Major', access_protocol: 'Limited' }, budget_and_restricted_items: 'Extensive budget for laboratory equipment, sample acquisition, and epidemiological studies. Can access BSL-4 labs.' },
        wikipedia_url: 'https://www.cdc.gov/ophss/index.html',
        professions: ['Scientist', 'Physician', 'Nurse or Paramedic'],
        suggested_bonus_skills: ['Science', 'Medicine', 'Forensics', 'Bureaucracy'],
        equipment: ['lab_coat', 'biohazard_suit', 'sample_collection_kit', 'encrypted_laptop'],
        ranks: {
            'Scientist': ['Research Fellow (GS-11)', 'Staff Scientist (GS-12)', 'Senior Scientist (GS-13)', 'Principal Investigator (GS-14)', 'Lab Chief (GS-15)', 'Associate Director for Science'],
            'Physician': ['Medical Officer (GS-12)', 'Senior Medical Officer (GS-13)', 'Team Lead, Epidemiology (GS-14)', 'Branch Chief (GS-15)', 'Division Director', 'Senior Medical Advisor'],
            'Nurse or Paramedic': ['Public Health Nurse (GS-9)', 'Nurse Consultant (GS-11)', 'Senior Nurse Consultant (GS-12)', 'Team Lead, Field Services (GS-13)', 'Senior Program Manager (GS-14)', 'Branch Chief for Response']
        },
        source: "Delta Green Agent's Handbook",
        page: 160,
        equipmentKit: ["SCIENTIST / MEDICAL KIT"],
        infoId: 'agency_cdc',
        specialTrainings: ['Epidemiological Field Work', 'BSL-4 Protocols']
    },
    {
        stub: 'cdc_eoc',
        name: 'CDC, Emergency Operations Center',
        agency: 'Centers for Disease Control and Prevention',
        description: 'The EOC is the CDC\'s command center for monitoring and coordinating emergency responses to domestic and international public health threats.',
        country: 'United States of America',
        rank_order: 51,
        yearOfEstablishment: 2001,
        info: {
            powers_of_arrest: 'None. Coordinates with law enforcement and public health authorities.',
            carry_of_weapon: 'Not authorized.',
            access_to_funds: { maximum_request: 'Major', access_protocol: 'On Request' },
            budget_and_restricted_items: 'Controls logistical resources for emergency deployments, global surveillance data feeds, and advanced communication systems.'
        },
        wikipedia_url: 'https://www.cdc.gov/about/eoc/index.htm',
        professions: ['Program Manager', 'Intelligence Analyst', 'Physician', 'Nurse or Paramedic'],
        suggested_bonus_skills: ['Bureaucracy', 'Computer Science', 'Alertness', 'Medicine'],
        equipment: ['secure_workstation', 'global_communication_suite', 'data_dashboards', 'emergency_response_plans'],
        ranks: {
            'Program Manager': ['Watch Officer (GS-12)', 'Senior Watch Officer (GS-13)', 'Team Lead, Response Operations (GS-14)', 'Branch Chief (GS-15)', 'Deputy Director, EOC', 'Director, EOC'],
            'Intelligence Analyst': ['Public Health Analyst (GS-11)', 'Senior Analyst (GS-12)', 'Supervisory Analyst (GS-13)', 'Team Lead, Intelligence (GS-14)', 'Branch Chief (GS-15)', 'Associate Director for Intelligence'],
            'Physician': ['Medical Officer (GS-13)', 'Senior Medical Officer (GS-14)', 'Team Lead, Medical Response (GS-15)', 'Deputy Chief Medical Officer', 'Chief Medical Officer, EOC', 'Director, EOC'],
            'Nurse or Paramedic': ['Public Health Advisor (GS-11)', 'Senior Advisor (GS-12)', 'Team Lead, Field Response (GS-13)', 'Branch Chief (GS-14)', 'Deputy Director for Operations', 'Director, EOC']
        },
        source: "Delta Green Agent's Handbook",
        page: 160,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_cdc',
        specialTrainings: ['Emergency Management']
    },
];