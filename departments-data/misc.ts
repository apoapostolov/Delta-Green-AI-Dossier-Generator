// departments-data/misc.ts
import type { Department } from '../types';

export const miscDepartments: Department[] = [
    // --- Public Health Service Commissioned Corps ---
    {
        stub: 'phscc',
        name: 'Public Health Service Commissioned Corps',
        agency: 'Public Health Service Commissioned Corps',
        description: 'A uniformed service of public health professionals, led by the Surgeon General, who respond to public health crises, conduct research, and provide care to underserved populations.',
        country: 'United States of America',
        rank_order: 45,
        yearOfEstablishment: 1889,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Major', access_protocol: 'Limited' }, budget_and_restricted_items: 'Can be deployed anywhere in the world with full logistical and financial support of the federal government. Access to deployable field hospitals and advanced medical equipment.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/United_States_Public_Health_Service_Commissioned_Corps',
        professions: ['Physician', 'Nurse or Paramedic', 'Scientist'],
        suggested_bonus_skills: ['Medicine', 'First Aid', 'Science', 'Survival', 'Bureaucracy'],
        equipment: ['uniform', 'field_medical_pack', 'vaccines', 'research_data'],
        ranks: {
            'Physician': ['Lieutenant (O-3)', 'Lieutenant Commander (O-4)', 'Commander (O-5)', 'Captain (O-6)', 'Rear Admiral (Lower Half)', 'Surgeon General (VADM)'],
            'Nurse or Paramedic': ['Lieutenant Junior Grade (O-2)', 'Lieutenant (O-3)', 'Lieutenant Commander (O-4)', 'Commander (O-5)', 'Captain (O-6)', 'Chief Nurse Officer (RADM)'],
            'Scientist': ['Lieutenant (O-3)', 'Lieutenant Commander (O-4)', 'Commander (O-5)', 'Captain (O-6)', 'Chief Scientist (RADM)', 'Deputy Surgeon General (VADM)']
        },
        source: "Delta Green Agent's Handbook",
        page: 160,
        equipmentKit: ["SCIENTIST / MEDICAL KIT"],
        infoId: 'agency_cdc',
        specialTrainings: ['Epidemiological Field Work', 'Hazmat Containment']
    },
    // --- US Marshals Service (USMS) ---
    {
        stub: 'usms_io',
        name: 'USMS, Investigative Operations',
        agency: 'U.S. Marshals Service',
        description: 'The primary operational arm of the Marshals Service, responsible for fugitive apprehension, witness protection, asset forfeiture, and judicial security.',
        country: 'United States of America',
        rank_order: 34,
        yearOfEstablishment: 1789,
        info: { powers_of_arrest: 'Broadest arrest powers in federal law enforcement, able to enforce any federal court order.', carry_of_weapon: 'Authorized to carry firearms on and off duty.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to federal and state law enforcement databases, informant funds, and the ability to deputize any local, state, or federal officer.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/United_States_Marshals_Service',
        professions: ['Federal Agent'],
        suggested_bonus_skills: ['Search', 'HUMINT', 'Law', 'Firearms', 'Alertness'],
        equipment: ['standard_sidearm', 'handcuffs', 'takedown_shotgun', 'warrant_files'],
        ranks: {
            'Federal Agent': ['Deputy U.S. Marshal', 'Senior Deputy U.S. Marshal', 'Supervisory Deputy U.S. Marshal', 'Assistant Chief Deputy', 'Chief Deputy U.S. Marshal', 'U.S. Marshal']
        },
        source: "Delta Green Agent's Handbook",
        page: 124,
        equipmentKit: ['FEDERAL AGENT'],
        infoId: 'agency_usms',
        specialTrainings: ['Protective Detail', 'Physical Surveillance']
    },
    {
        stub: 'usms_sog',
        name: 'USMS, Special Operations Group (SOG)',
        agency: 'U.S. Marshals Service',
        description: "The SOG is the USMS's tactical team, a self-supporting unit that can deploy anywhere in the world to handle high-threat situations, including fugitive apprehension, witness protection, and courthouse security.",
        country: 'United States of America',
        rank_order: 17,
        yearOfEstablishment: 1971,
        info: { powers_of_arrest: "Broadest arrest powers, exercised in high-threat environments.", carry_of_weapon: "Authorized to carry firearms; SOG is heavily armed with tactical weaponry.", access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: "Budget focused on tactical equipment, transportation, and fugitive investigations. Can call on any federal asset to assist in a manhunt." },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Special_Operations_Group_(United_States_Marshals_Service)',
        professions: ['Federal Agent', 'Special Operator'],
        suggested_bonus_skills: ['Firearms', 'Athletics', 'Alertness', 'Search', 'Melee Weapons'],
        equipment: ['tactical_carbine', 'body_armor', 'restraints', 'armored_vehicle_access'],
        ranks: {
            'Federal Agent': ['SOG Deputy', 'Senior SOG Deputy', 'SOG Team Leader', 'SOG Section Chief', 'Deputy Commander, SOG', 'Commander, SOG'],
            'Special Operator': ['SOG Deputy', 'Senior SOG Deputy', 'SOG Team Leader', 'SOG Section Chief', 'Deputy Commander, SOG', 'Commander, SOG']
        },
        source: "Delta Green Agent's Handbook",
        page: 124,
        equipmentKit: ['SWAT TEAM'],
        infoId: 'agency_usms',
        specialTrainings: ['Tear Gas & Stun Grenades', 'Explosive Entry / Breaching']
    },
];