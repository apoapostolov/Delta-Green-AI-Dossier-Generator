// departments-data/usmc.ts
import type { Department } from '../types';

export const usmcDepartments: Department[] = [
    {
        stub: 'usmc_forecon',
        name: 'USMC, Force Reconnaissance',
        agency: 'U.S. Marine Corps',
        description: 'Elite infantry Marines that provide deep reconnaissance and direct action capabilities for the Marine Expeditionary Force (MEF). They operate behind enemy lines.',
        country: 'United States of America',
        rank_order: 19,
        yearOfEstablishment: 1957,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry military-grade weaponry.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Experts in amphibious reconnaissance, surveillance, and small unit tactics. Equipped for extended, unsupported operations.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/United_States_Marine_Corps_Force_Reconnaissance',
        professions: ['Special Operator', 'Soldier or Marine'],
        suggested_bonus_skills: ['Stealth', 'Survival', 'Navigate', 'Firearms', 'Swim'],
        equipment: ['recon_carbine', 'combat_dive_kit', 'zodiac_boat', 'field_radio'],
        ranks: {
            'Special Operator': ['Recon Marine', 'Assistant Team Leader', 'Team Leader', 'Platoon Sergeant', 'Company First Sergeant', 'Battalion Sergeant Major'],
            'Soldier or Marine': ['Recon Marine', 'Assistant Team Leader', 'Team Leader', 'Platoon Sergeant', 'Company First Sergeant', 'Battalion Sergeant Major']
        },
        source: "Delta Green Agent's Handbook",
        page: 138,
        equipmentKit: ['SPECIAL OPERATOR'],
        infoId: 'agency_usmc',
        specialTrainings: ['Parachuting', 'SCUBA Gear', 'Maritime Operations (VBSS)']
    },
    {
        stub: 'usmc_msp_force',
        name: 'USMC, Maritime Special Purpose Force',
        agency: 'U.S. Marine Corps',
        description: 'A component of a Marine Expeditionary Unit (MEU) that serves as a rapid response force for specialized missions like vessel boardings, rescues, and reinforcement.',
        country: 'United States of America',
        rank_order: 23,
        yearOfEstablishment: 1985,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry military-grade weaponry.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Trained in close-quarters battle, visit, board, search, and seizure (VBSS) operations, and embassy reinforcement.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Maritime_Raid_Force',
        professions: ['Special Operator', 'Soldier or Marine'],
        suggested_bonus_skills: ['Firearms', 'Melee Weapons', 'Athletics', 'Demolitions', 'Swim'],
        equipment: ['breaching_shotgun', 'fast_rope_gloves', 'caving_ladder', 'body_armor'],
        ranks: {
            'Special Operator': ['Raider', 'Assistant Team Leader', 'Team Leader', 'Platoon Sergeant', 'Company First Sergeant', 'Battalion Sergeant Major'],
            'Soldier or Marine': ['Raider', 'Assistant Team Leader', 'Team Leader', 'Platoon Sergeant', 'Company First Sergeant', 'Battalion Sergeant Major']
        },
        source: "Delta Green Agent's Handbook",
        page: 138,
        equipmentKit: ["SWAT TEAM"],
        infoId: 'agency_usmc',
        specialTrainings: ['Explosive Entry / Breaching', 'Maritime Operations (VBSS)']
    },
    {
        stub: 'usmc_combat_camera',
        name: 'USMC, Combat Camera (COMCAM)',
        agency: 'U.S. Marine Corps',
        description: 'Marines trained as photographers and videographers who document combat operations, training exercises, and humanitarian missions for historical and public affairs purposes.',
        country: 'United States of America',
        rank_order: 48,
        yearOfEstablishment: 1950,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry standard issue sidearms for personal protection.', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to high-end, ruggedized camera and video equipment, editing software, and satellite uplinks to transmit footage.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Combat_camera',
        professions: ['Soldier or Marine', 'Media Specialist'],
        suggested_bonus_skills: ['Art', 'Stealth', 'Alertness', 'Computer Science', 'Persuade'],
        equipment: ['dslr_camera', 'combat_helmet_with_camera_mount', 'ruggedized_laptop', 'press_pass'],
        ranks: {
            'Soldier or Marine': ['Combat Photographer', 'Combat Videographer', 'NCOIC, COMCAM Team', 'COMCAM Chief', 'MEF COMCAM Chief', 'HQMC COMCAM Chief'],
            'Media Specialist': ['Combat Photographer', 'Combat Videographer', 'NCOIC, COMCAM Team', 'COMCAM Chief', 'MEF COMCAM Chief', 'HQMC COMCAM Chief']
        },
        source: "Delta Green Agent's Handbook",
        page: 138,
        equipmentKit: ["INVESTIGATOR'S KIT"],
        infoId: 'agency_usmc',
        specialTrainings: ['Counter-Surveillance', 'Physical Surveillance']
    },
    {
        stub: 'usmc_sfr',
        name: 'USMC, Security Force Regiment',
        agency: 'U.S. Marine Corps',
        description: 'Provides security forces to guard high-value naval assets, including nuclear weapons and vessels. Includes Fleet Antiterrorism Security Teams (FAST) companies.',
        country: 'United States of America',
        rank_order: 24,
        yearOfEstablishment: 1986,
        info: { powers_of_arrest: 'Military police powers within their jurisdiction.', carry_of_weapon: 'Authorized to carry military-grade weaponry.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Experts in site security, counter-surveillance, and close-quarters battle. Can be deployed globally on short notice.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Marine_Corps_Security_Force_Regiment',
        professions: ['Soldier or Marine'],
        suggested_bonus_skills: ['Firearms', 'Alertness', 'Melee Weapons', 'Military Science', 'Search'],
        equipment: ['m4_carbine', 'body_armor', 'secure_site_blueprints', 'sentry_duty'],
        ranks: {
            'Soldier or Marine': ['Guard', 'Corporal of the Guard', 'Sergeant of the Guard', 'Platoon Sergeant', 'Company First Sergeant', 'Battalion Sergeant Major']
        },
        source: "Delta Green Agent's Handbook",
        page: 139,
        equipmentKit: ["SWAT TEAM"],
        infoId: 'agency_usmc',
        specialTrainings: ['Urban Warfare']
    },
    {
        stub: 'usmc_raider_regiment',
        name: 'USMC, Raider Regiment (MARSOC)',
        agency: 'U.S. Marine Corps',
        description: 'The Marine Corps component of U.S. Special Operations Command (SOCOM). Marine Raiders conduct direct action, special reconnaissance, and foreign internal defense.',
        country: 'United States of America',
        rank_order: 18,
        yearOfEstablishment: 2006,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry a wide array of customized special operations weaponry.', access_to_funds: { maximum_request: 'Major', access_protocol: 'On Request' }, budget_and_restricted_items: 'Equipped and trained for the full spectrum of special operations missions. Can operate autonomously for extended periods.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/Marine_Raider_Regiment',
        professions: ['Special Operator'],
        suggested_bonus_skills: ['Firearms', 'Stealth', 'Survival', 'HUMINT', 'Military Science'],
        equipment: ['socom_scar_rifle', 'high_cut_helmet', 'combat_dive_gear', 'stiletto_knife'],
        ranks: {
            'Special Operator': ['Critical Skills Operator (CSO)', 'Element Member', 'Element Leader', 'Team Chief', 'Company Operations Chief', 'Regimental Sergeant Major']
        },
        source: "Delta Green Agent's Handbook",
        page: 145,
        equipmentKit: ['SPECIAL OPERATOR'],
        infoId: 'agency_socom',
        specialTrainings: ['Parachuting', 'SCUBA Gear', 'Advanced Interrogation', 'Maritime Operations (VBSS)']
    },
];