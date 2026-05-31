import React from 'react';

const sectionColors: Record<string, string> = {
    'Hand-to-Hand Weapons': 'bg-red-900/50 text-red-300',
    'Firearms': 'bg-red-900/50 text-red-300',
    'Tear Gas and Pepper Spray': 'bg-yellow-900/50 text-yellow-300',
    'Stun Grenades': 'bg-yellow-900/50 text-yellow-300',
    'Electroshock Weapons': 'bg-sky-900/50 text-sky-300',
    'Heavy Weapons': 'bg-red-900/50 text-red-300',
    'Demolitions': 'bg-orange-900/50 text-orange-300',
    'Artillery': 'bg-orange-900/50 text-orange-300',
    'Body Armor': 'bg-sky-900/50 text-sky-300',
    'Ground Vehicles': 'bg-gray-700 text-gray-300',
    'Water Vehicles': 'bg-gray-700 text-gray-300',
    'Air Vehicles': 'bg-gray-700 text-gray-300',
    'Weapon Accessories': 'bg-teal-900/50 text-teal-300',
    'Surveillance': 'bg-purple-900/50 text-purple-300',
    'Communications and Computers': 'bg-purple-900/50 text-purple-300',
    'Default': 'bg-gray-800/50 text-gray-300'
};

export const SectionHeader: React.FC<{ section: string }> = ({ section }) => {
    const colorClass = Object.keys(sectionColors).find(key => section.toLowerCase().includes(key.toLowerCase())) || 'Default';
    const finalClass = sectionColors[colorClass] || sectionColors.Default;
    
    return (
        <h3 className={`text-xl font-bold p-2 rounded-t-lg ${finalClass}`}>
            {section}
        </h3>
    );
};