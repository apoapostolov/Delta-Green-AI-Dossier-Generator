export interface EquipmentPack {
    name: string;
    description: string;
    items: string[];
}

export const EQUIPMENT_PACKS: EquipmentPack[] = [
    {
        name: 'CASE OFFICER PACK',
        description: 'Discreet field tradecraft for interviews, surveillance, and controlled meetings.',
        items: [
            'Burner Phone',
            'Tablet Computer or Smartphone',
            'Pen and Pocket Notebook',
            'Voice-Activated Recorder',
            'Ordinary Binoculars',
            'Lockpick Kit',
            'Light Pistol',
            'Sound Suppressor',
        ],
    },
    {
        name: 'ENTRY TEAM PACK',
        description: 'Breaching and close-action tools for agents expecting resistance.',
        items: [
            'Light Rifle or Carbine',
            'Medium Pistol',
            'Flash-Bang Grenade (thrown)',
            'Battering Ram',
            'Halligan Forcible-Entry Tool',
            'Flexible Cuffs',
            'Tactical Body Armor',
            'Kevlar Helmet',
        ],
    },
    {
        name: 'FORENSICS PACK',
        description: 'Evidence handling and scene processing gear for investigators and lab-minded agents.',
        items: [
            'Small Evidence-Collection Kit',
            'DSLR Camera',
            'Encrypted Laptop',
            'Pen and Pocket Notebook',
            'Personal Protective Equipment (PPE)',
            'Gloves',
            'Large Flashlight',
            'Water and Soil Sampler',
        ],
    },
    {
        name: 'MEDICAL CONTAINMENT PACK',
        description: 'Emergency treatment and contamination control for ugly scenes.',
        items: [
            'First Responder Medical Kit',
            'Individual First Aid Kit',
            'Self-Applying Tourniquet',
            'Hemostatic Gel',
            'Gas Mask',
            'HAZMAT Suit',
            'Decontamination Kit',
            'Scalpel Set',
        ],
    },
    {
        name: 'SURVEILLANCE PACK',
        description: 'Observation and tracking tools for patient, standoff work.',
        items: [
            'Covert Surveillance Kit',
            'GPS Tracking Device',
            'Directional Microphone & Acoustic Software',
            'Bug Detector',
            'Fiber Optic Scope',
            'Encrypted Laptop',
            'Burner Phone',
            'Car or SUV (rented for a week)',
        ],
    },
    {
        name: 'WILDERNESS PURSUIT PACK',
        description: 'Field endurance kit for remote searches and unpleasant terrain.',
        items: [
            'Handheld GPS',
            'Compass',
            'Rucksack',
            'Hydration System (e.g., Camelbak)',
            'MREs (Meals, Ready-to-Eat)',
            'Large Flashlight',
            'Multi-Tool',
            'Poncho and Liner',
        ],
    },
];
