// departments-data/usaf.ts
import type { Department } from '../types';

export const usafDepartments: Department[] = [
    {
        stub: 'usaf_614_aoc',
        name: 'USAF, 614th Air and Space Operations Center',
        agency: 'U.S. Air Force',
        description: 'Provides command and control for U.S. Space Command, tracking satellites, monitoring missile launches, and overseeing all military space operations.',
        country: 'United States of America',
        rank_order: 15,
        yearOfEstablishment: 1992,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not authorized for most personnel.', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'On Request' }, budget_and_restricted_items: 'Controls multi-billion dollar satellite constellations and global surveillance assets. Access to the highest levels of signals and imagery intelligence.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/614th_Air_Operations_Center',
        professions: ['Pilot or Sailor', 'Intelligence Analyst'],
        suggested_bonus_skills: ['SIGINT', 'Computer Science', 'Science', 'Military Science', 'Alertness'],
        equipment: ['flight_suit', 'constellation_charts', 'secure_workstation', 'headset'],
        ranks: {
            'Pilot or Sailor': ['Space Operations Officer', 'Senior Space Ops Officer', 'Flight Commander', 'Squadron Commander', 'Group Commander', 'Wing Commander'],
            'Intelligence Analyst': ['Intelligence Officer', 'Senior Intel Officer', 'Flight Commander, Intel', 'Squadron Director of Operations', 'Group Director of Intelligence', 'Wing Director of Intelligence']
        },
        source: "Delta Green Agent's Handbook",
        page: 132,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_usaf',
        specialTrainings: ['Drone Piloting']
    },
    {
        stub: 'usaf_41_rs',
        name: 'USAF, 41st Rescue Squadron',
        agency: 'U.S. Air Force',
        description: 'A combat search and rescue (CSAR) squadron that deploys worldwide to recover downed aircrew and isolated personnel from hostile or denied territory.',
        country: 'United States of America',
        rank_order: 26,
        yearOfEstablishment: 1952,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry personal defense weapons and aircraft-mounted machine guns.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Operates HH-60G Pave Hawk helicopters with advanced navigation and defensive systems. Access to pararescue jumpers (PJs) and survival equipment.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/41st_Rescue_Squadron',
        professions: ['Pilot or Sailor', 'Soldier or Marine'],
        suggested_bonus_skills: ['Pilot', 'Navigate', 'Survival', 'First Aid', 'Heavy Weapons'],
        equipment: ['flight_helmet', 'survival_vest', 'hh_60g_pave_hawk', 'extraction_winch'],
        ranks: {
            'Pilot or Sailor': ['Co-Pilot', 'Aircraft Commander', 'Flight Lead', 'Flight Commander', 'Squadron Director of Operations', 'Squadron Commander'],
            'Soldier or Marine': ['Pararescueman (PJ)', 'Senior PJ', 'Team Leader', 'Flight NCOIC', 'Squadron Superintendent', 'Group Superintendent']
        },
        source: "Delta Green Agent's Handbook",
        page: 132,
        equipmentKit: ["SPECIAL OPERATOR"],
        infoId: 'agency_usaf',
        specialTrainings: ['SCUBA Gear', 'Parachuting']
    },
    {
        stub: 'usaf_354_fs',
        name: 'USAF, 354th Fighter Squadron ("Bulldogs")',
        agency: 'U.S. Air Force',
        description: 'An A-10 Thunderbolt II squadron specializing in close air support (CAS), forward air control, and combat search and rescue for ground forces.',
        country: 'United States of America',
        rank_order: 27,
        yearOfEstablishment: 1942,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'N/A (Operates combat aircraft armed with cannons, missiles, and bombs).', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'On Request' }, budget_and_restricted_items: 'Operates A-10 Thunderbolt II aircraft. Access to advanced targeting pods, munitions, and joint tactical air control party (TACP) assets.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/354th_Fighter_Squadron',
        professions: ['Pilot or Sailor'],
        suggested_bonus_skills: ['Pilot', 'Military Science', 'Artillery', 'SIGINT', 'Alertness'],
        equipment: ['flight_suit', 'g_suit', 'a_10_warthog', 'targeting_pod'],
        ranks: {
            'Pilot or Sailor': ['Wingman', 'Flight Lead', 'Instructor Pilot', 'Flight Commander', 'Squadron Director of Operations', 'Squadron Commander']
        },
        source: "Delta Green Agent's Handbook",
        page: 133,
        equipmentKit: ["SOLDIER'S KIT"],
        infoId: 'agency_usaf',
        specialTrainings: ['Drone Piloting']
    },
    {
        stub: 'usaf_432_og',
        name: 'USAF, 432nd Operations Group',
        agency: 'U.S. Air Force',
        description: 'The primary operator of the MQ-9 Reaper remotely piloted aircraft (drone), conducting persistent surveillance, reconnaissance, and strike missions worldwide.',
        country: 'United States of America',
        rank_order: 28,
        yearOfEstablishment: 1943,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not applicable (pilots are located in ground control stations).', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'Limited' }, budget_and_restricted_items: 'Operates a fleet of MQ-9 Reaper drones armed with Hellfire missiles. Access to full-motion video feeds, signals intelligence packages, and global satellite communications.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/432nd_Wing',
        professions: ['Pilot or Sailor', 'Intelligence Analyst'],
        suggested_bonus_skills: ['Pilot', 'SIGINT', 'Search', 'Alertness', 'Military Science'],
        equipment: ['flight_suit', 'ground_control_station', 'joystick', 'mq_9_reaper_drone'],
        ranks: {
            'Pilot or Sailor': ['RPA Pilot', 'Aircraft Commander', 'Instructor Pilot', 'Flight Commander', 'Squadron Director of Operations', 'Squadron Commander'],
            'Intelligence Analyst': ['Sensor Operator', 'Senior Sensor Operator', 'Mission Intel Coordinator', 'Flight Commander, Intel', 'Squadron Director of Intelligence', 'Group Director of Intelligence']
        },
        source: "Delta Green Agent's Handbook",
        page: 133,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_usaf',
        specialTrainings: ['Drone Piloting']
    },
    {
        stub: 'usaf_70_isrw',
        name: 'USAF, 70th Intelligence, Surveillance and Reconnaissance Wing',
        agency: 'U.S. Air Force',
        description: 'Provides global cryptologic and information operations capabilities to the Air Force and the NSA, conducting signals intelligence (SIGINT) missions from various platforms.',
        country: 'United States of America',
        rank_order: 14,
        yearOfEstablishment: 1948,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to the NSA\'s global surveillance network, advanced signals processing equipment, and secure data links with intelligence platforms like the RC-135 Rivet Joint.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/70th_Intelligence,_Surveillance_and_Reconnaissance_Wing',
        professions: ['Intelligence Analyst'],
        suggested_bonus_skills: ['SIGINT', 'Foreign Language', 'Computer Science', 'History', 'Bureaucracy'],
        equipment: ['headset', 'signals_analysis_software', 'secure_workstation', 'polygraph_test'],
        ranks: {
            'Intelligence Analyst': ['Cryptologic Analyst', 'Senior Analyst', 'Mission Supervisor', 'Flight Commander, Analysis', 'Squadron Director of Intelligence', 'Wing Director of Intelligence']
        },
        source: "Delta Green Agent's Handbook",
        page: 133,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_usaf',
        specialTrainings: ['Technical Surveillance Counter-Measures (TSCM)', 'Covert Communications']
    },
    {
        stub: 'usaf_318_cog',
        name: 'USAF, 318th Cyberspace Operations Group',
        agency: 'U.S. Air Force',
        description: 'Conducts defensive and offensive cyberspace operations, providing information warfare capabilities to combatant commanders.',
        country: 'United States of America',
        rank_order: 13,
        yearOfEstablishment: 1942,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Not authorized.', access_to_funds: { maximum_request: 'Incidental', access_protocol: 'Limited' }, budget_and_restricted_items: 'Access to advanced cyber warfare tools, global network infrastructure, and zero-day exploits. Engages in both network defense and offensive cyber-attacks.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/318th_Cyberspace_Operations_Group',
        professions: ['Intelligence Analyst', 'Computer Scientist or Engineer'],
        suggested_bonus_skills: ['Computer Science', 'SIGINT', 'Science', 'Law', 'Bureaucracy'],
        equipment: ['high_end_computer', 'server_racks', 'network_diagrams', 'energy_drinks'],
        ranks: {
            'Intelligence Analyst': ['Cyber Warfare Analyst', 'Senior Cyber Analyst', 'Mission Supervisor', 'Flight Commander, Cyber Ops', 'Squadron Director of Operations', 'Group Commander'],
            'Computer Scientist or Engineer': ['Cyber Warfare Operator', 'Senior Operator', 'Team Lead', 'Flight Commander, Cyber Ops', 'Squadron Director of Operations', 'Group Commander']
        },
        source: "Delta Green Agent's Handbook",
        page: 133,
        equipmentKit: ["INTELLIGENCE / COVERT OPS KIT"],
        infoId: 'agency_usaf',
        specialTrainings: ['Electronic Security Systems']
    },
    {
        stub: 'usaf_24_sow',
        name: 'USAF, 24th Special Operations Wing',
        agency: 'U.S. Air Force',
        description: 'The Air Force\'s tactical air-ground integration force, providing Special Tactics Officers, Combat Controllers (CCT), Pararescuemen (PJ), and other specialists for joint special operations.',
        country: 'United States of America',
        rank_order: 8,
        yearOfEstablishment: 1956,
        info: { powers_of_arrest: 'None.', carry_of_weapon: 'Authorized to carry military-grade weaponry.', access_to_funds: { maximum_request: 'Standard', access_protocol: 'On Request' }, budget_and_restricted_items: 'Can direct airstrikes, parachute into hostile territory, and conduct personnel recovery. Equipped with advanced communications gear, medical equipment, and weapons.' },
        wikipedia_url: 'https://en.wikipedia.org/wiki/24th_Special_Operations_Wing',
        professions: ['Special Operator'],
        suggested_bonus_skills: ['Military Science', 'SIGINT', 'First Aid', 'Navigate', 'Demolitions'],
        equipment: ['paracommando_rifle', 'combat_radio', 'medical_ruck', 'laser_target_designator'],
        ranks: {
            'Special Operator': ['Apprentice (CCT/PJ)', 'Journeyman', 'Craftsman', 'Team Leader', 'Squadron Superintendent', 'Wing Command Chief']
        },
        source: "Delta Green Agent's Handbook",
        page: 143,
        equipmentKit: ['SPECIAL OPERATOR'],
        infoId: 'agency_socom',
        specialTrainings: ['Parachuting', 'Hand Grenades']
    },
];