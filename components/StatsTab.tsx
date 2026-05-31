import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Attribute, AttributeSet, Profession, Department, Tab } from '../types';
import type { SimResult } from '../sim/types';
import { DiceIcon } from './icons/DiceIcon';
import { AttributeDisplay } from './AttributeDisplay';
import { ProfessionCard } from './ProfessionCard';
import { DepartmentCard } from './DepartmentCard';
import { RollHistoryCard } from './RollHistoryCard';
import { Tooltip } from './Tooltip';
import { useCharacterContext } from '../context/CharacterContext';

const ATTRIBUTES: Attribute[] = ['STR', 'CON', 'DEX', 'INT', 'POW', 'CHA'];
const ATTRIBUTE_MAP: Record<Attribute, string> = {
    STR: 'Strength',
    CON: 'Constitution',
    DEX: 'Dexterity',
    INT: 'Intelligence',
    POW: 'Power',
    CHA: 'Charisma',
};

const normalizeEventKind = (kind: string): string => {
    if (kind === 'KIA') return 'KIA';
    return kind.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
};

const isProfessionQualified = (profession: Profession, attributes: AttributeSet | null): boolean => {
    if (!attributes) return false;
    if (!profession.recommendedStats || profession.recommendedStats.length === 0) return true; // Qualified by default if no recommendation
    return profession.recommendedStats.every(stat => attributes[stat] >= 10);
};

interface StatsTabProps {
    handleRoll: () => void;
    attributes: AttributeSet | null;
    derivedStats: { SAN: number; HP: number; WP: number; BP: number, Bonds: number } | null;
    professions: Profession[];
    selectedProfession: Profession | null;
    onSelectProfession: (name: string) => void;
    onShowProfessionInfo: (profession: Profession) => void;
    departments: Department[];
    selectedDepartment: Department | null;
    onSelectDepartment: (stub: string) => void;
    onShowDepartmentInfo: (department: Department) => void;
    rollHistory: AttributeSet[];
    onRestoreRoll: (roll: AttributeSet) => void;
    careerAttributeChanges: Record<string, number>;
    simResult: SimResult | null;
    careerApplied: boolean;
    setActiveTab: (tab: Tab) => void;
}

export const StatsTab: React.FC<StatsTabProps> = ({
    handleRoll,
    attributes,
    derivedStats,
    professions,
    selectedProfession,
    onSelectProfession,
    onShowProfessionInfo,
    departments,
    selectedDepartment,
    onSelectDepartment,
    onShowDepartmentInfo,
    rollHistory,
    onRestoreRoll,
    careerAttributeChanges,
    simResult,
    careerApplied,
    setActiveTab,
}) => {
    const [subTab, setSubTab] = useState<'professions' | 'departments'>('professions');
    const [professionFilterText, setProfessionFilterText] = useState('');
    const [departmentFilterText, setDepartmentFilterText] = useState('');
    const { veteranChanges, damagedVeteranOption, selectDepartmentOrSpecialProfession } = useCharacterContext();
    const subTabContainerRef = useRef<HTMLDivElement>(null);
    
    const handleSubTabChange = (newSubTab: 'professions' | 'departments') => {
        setSubTab(newSubTab);
        setTimeout(() => {
            subTabContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };
    
    useEffect(() => {
        if (!selectedProfession) {
            setSubTab('professions');
        }
    }, [selectedProfession]);

    const handleSelectProfession = (name: string) => {
        onSelectProfession(name);

        const profession = professions.find(p => p.name === name);
        if (!profession) {
            // Brief delay to show selection state before switching subtab
            setTimeout(() => handleSubTabChange('departments'), 350);
            return;
        };

        const hasDepartments = departments.some(d => d.professions.includes(profession.name));
        const hasSpecialUnits = professions.some(p => p.isDepartment && p.eligibleProfessions?.includes(profession.name));

        // Brief delay before navigating to next step so the selected card state is visible
        setTimeout(() => {
            if (!hasDepartments && !hasSpecialUnits) {
                setActiveTab('skills');
            } else {
                handleSubTabChange('departments');
            }
        }, 350);
    };

    const handleDepartmentSelection = (stub: string) => {
        // Brief delay to let the selection state be visible before navigating
        setTimeout(() => {
            selectDepartmentOrSpecialProfession(stub);
            setActiveTab('skills');
        }, 350);
    };
    
    const professionsToShow = useMemo(() => {
        // Per user request, selecting a department no longer filters the profession list.
        // The department's profession list is a suggestion, not a requirement.
        return professions.filter(p => !p.isDepartment);
    }, [professions]);

    const activeFilterText = subTab === 'professions' ? professionFilterText : departmentFilterText;
    const setActiveFilterText = subTab === 'professions' ? setProfessionFilterText : setDepartmentFilterText;

    const professionGroups = [
        { name: 'Federal Agents', group: 'Federal Agent', borderColor: 'border-blue-700', list: professionsToShow.filter(p => p.group === 'Federal Agent') },
        { name: 'Military Personnel', group: 'Military', borderColor: 'border-green-700', list: professionsToShow.filter(p => p.group === 'Military') },
        { name: 'Civilian Specialists', group: 'Civilian Specialist', borderColor: 'border-purple-700', list: professionsToShow.filter(p => p.group === 'Civilian Specialist') },
        { name: 'Academic Experts', group: 'Academic Expert', borderColor: 'border-amber-700', list: professionsToShow.filter(p => p.group === 'Academic Expert') },
    ];
    
    const departmentsAndUnitsByCountry = useMemo(() => {
        const specialUnitRankMap: Record<string, number> = {
            'CIA SAD/PAG Officer': 3, 'CIA SAD/SOG Operator': 2, 'DEA FAST Operator': 16,
            'EPA CID Special Agent': 60, 'FBI HRT/SWAT Operator': 5, 'ICE SRT Operator': 17,
            'USMS SOG Operator': 17, 'Army 10th Mountain Division': 43, 'Army 1st Cavalry Division': 42,
            'EPA Regional Specialist': 61, 'Marine Corps Embassy Security Group': 20,
        };

        const specialUnitsAsDepts = professions
            .filter(p => p.isDepartment)
            .map(p => ({
                stub: p.name, name: p.name, description: p.description, country: 'United States of America',
                rank_order: specialUnitRankMap[p.name] ?? 99,
                info: { powers_of_arrest: '', carry_of_weapon: '', access_to_funds: {} as any, budget_and_restricted_items: '' },
                wikipedia_url: '', professions: [], suggested_bonus_skills: [], equipment: [], ranks: {},
                isProfessionAsDept: true, infoId: p.infoId
            } as Department));

        const allOptions = [...departments, ...specialUnitsAsDepts];
        
        const filtered = selectedProfession
            ? allOptions.filter(opt => {
                if (opt.isProfessionAsDept) {
                    const profData = professions.find(p => p.name === opt.stub);
                    return profData?.eligibleProfessions?.includes(selectedProfession.name);
                } else {
                    return opt.professions.includes(selectedProfession.name);
                }
            })
            : allOptions;
        
        const grouped = filtered.reduce((acc, dept) => {
            const country = dept.country || 'Uncategorized';
            if (!acc[country]) acc[country] = [];
            acc[country].push(dept);
            return acc;
        }, {} as Record<string, Department[]>);

        for (const country in grouped) {
            grouped[country].sort((a, b) => a.rank_order - b.rank_order);
        }

        return grouped;
    }, [departments, professions, selectedProfession]);

    const filteredProfessionGroups = useMemo(() => {
        const query = professionFilterText.trim().toLowerCase();
        if (!query) return professionGroups;

        return professionGroups
            .map(group => ({
                ...group,
                list: group.list.filter(profession => (
                    profession.name.toLowerCase().includes(query) ||
                    profession.description.toLowerCase().includes(query)
                )),
            }))
            .filter(group => group.list.length > 0);
    }, [professionFilterText, professionGroups]);

    const filteredDepartmentsByCountry = useMemo(() => {
        const query = departmentFilterText.trim().toLowerCase();
        if (!query) return departmentsAndUnitsByCountry;

        const filteredEntries = Object.entries(departmentsAndUnitsByCountry).reduce((acc, [country, depts]) => {
            const filtered = depts.filter(dept => (
                dept.name.toLowerCase().includes(query) ||
                dept.description.toLowerCase().includes(query) ||
                dept.country.toLowerCase().includes(query)
            ));

            if (filtered.length > 0) acc[country] = filtered;
            return acc;
        }, {} as Record<string, Department[]>);

        return filteredEntries;
    }, [departmentFilterText, departmentsAndUnitsByCountry]);


    const derivedStatOrder = ['HP', 'SAN', 'WP', 'Bonds', 'BP'];
    
    const hpChange = careerApplied ? (simResult?.maxHpChange ?? 0) : 0;
    const sanChange = (careerApplied ? (simResult?.sanChange ?? 0) : 0) + veteranChanges.san;
    const bondChange = careerApplied ? (simResult?.bondChange ?? 0) : 0;

    const hpEvents = simResult?.events.filter(e => e.outcome.maxHpDelta).map(e => `Career: ${normalizeEventKind(e.kind)} (${e.year}, ${e.outcome.maxHpDelta})`).join('\n');
    const sanEvents = [
        careerApplied ? simResult?.events.filter(e => e.outcome.sanDelta).map(e => `Career: ${normalizeEventKind(e.kind)} (${e.year}, ${e.outcome.sanDelta})`).join('\n') : null,
        veteranChanges.san !== 0 ? `Background (${damagedVeteranOption}): ${veteranChanges.san}` : null
    ].filter(Boolean).join('\n');
    const bondEvents = simResult?.events.filter(e => e.outcome.bondDelta).map(e => `Career: ${normalizeEventKind(e.kind)} (${e.year}, ${e.outcome.bondDelta})`).join('\n');

    const derivedChanges = { HP: hpChange, SAN: sanChange, WP: 0, BP: 0, Bonds: bondChange };
    const derivedEvents = { HP: hpEvents, SAN: sanEvents, WP: null, BP: null, Bonds: bondEvents };

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <div className="text-center">
                <button onClick={handleRoll} className="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center mx-auto">
                    <DiceIcon className="mr-2 h-6 w-6"/>
                    Roll Attributes
                </button>
            </div>
            {attributes && derivedStats && (
                <>
                    <div>
                        <h3 className="text-xl font-bold text-gray-300 mb-4 text-center uppercase tracking-wider">Attributes</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {ATTRIBUTES.map(attr => {
                                const careerChange = careerApplied ? (careerAttributeChanges[attr] || 0) : 0;
                                const careerEvents = simResult?.events
                                    .filter(e => e.outcome.attributeDelta && e.outcome.attributeDelta[attr])
                                    .map(e => {
                                        const change = e.outcome.attributeDelta![attr];
                                        return `${normalizeEventKind(e.kind)} (${e.year}, ${change > 0 ? '+' : ''}${change})`;
                                    })
                                    .join(', ');
                                const veteranChange = veteranChanges.attributes[attr] || 0;
                                const veteranEvents = veteranChange ? `Background (${damagedVeteranOption}): ${veteranChange > 0 ? '+' : ''}${veteranChange}` : null;
                                
                                const totalChange = careerChange + veteranChange;
                                const combinedEvents = [
                                    careerApplied && careerEvents ? `Career: ${careerEvents}` : null,
                                    veteranEvents
                                ].filter(Boolean).join('\n');

                                return (
                                    <AttributeDisplay 
                                        key={attr} 
                                        label={ATTRIBUTE_MAP[attr]} 
                                        score={attributes[attr]} 
                                        change={totalChange !== 0 ? totalChange : undefined}
                                        changeEvents={combinedEvents || undefined}
                                    />
                                );
                            })}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold text-gray-300 mb-4 text-center uppercase tracking-wider">Derived Statistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                            {derivedStatOrder.map(key => {
                                const value = derivedStats[key as keyof typeof derivedStats];
                                if (value === undefined || value === null) return null;
                                const change = derivedChanges[key as keyof typeof derivedChanges];
                                const events = derivedEvents[key as keyof typeof derivedEvents];
                                const hasChange = typeof change === 'number' && change !== 0;

                                return (
                                    <div key={key} className="relative text-center bg-black/30 p-3 rounded-md">
                                        {hasChange && (
                                            <Tooltip content={events ? <div className="text-xs whitespace-pre-wrap">{events}</div> : undefined}>
                                                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold border-2 shadow-lg backdrop-blur-sm ${change > 0 ? 'bg-green-900/80 border-green-500 text-green-300' : 'bg-red-900/80 border-red-500 text-red-300'}`}>
                                                    {change > 0 ? '+' : ''}{change}
                                                </div>
                                            </Tooltip>
                                        )}
                                        <div className="font-bold uppercase text-sm text-gray-400">{key}</div>
                                        <div className="text-3xl font-mono font-bold text-gray-200">{value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div ref={subTabContainerRef}>
                        <h3 className="text-2xl font-bold text-gray-300 mb-6 text-center uppercase tracking-widest">Select Profession & Department</h3>
                        
                        <div className="flex justify-center border-b border-gray-600 mb-6">
                            <button
                                onClick={() => handleSubTabChange('professions')}
                                className={`py-2 px-6 font-bold text-lg ${subTab === 'professions' ? 'border-b-2 border-green-400 text-green-300' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                1. Profession
                            </button>
                            <button
                                onClick={() => handleSubTabChange('departments')}
                                disabled={!selectedProfession}
                                className={`py-2 px-6 font-bold text-lg ${subTab === 'departments' ? 'border-b-2 border-green-400 text-green-300' : 'text-gray-500 hover:text-gray-300'} disabled:cursor-not-allowed disabled:hover:text-gray-500`}
                            >
                                2. Department
                            </button>
                        </div>

                        <div className="mb-8">
                            <input
                                id="profession-department-filter"
                                type="text"
                                value={activeFilterText}
                                onChange={(e) => setActiveFilterText(e.target.value)}
                                placeholder={subTab === 'professions' ? 'Type to filter professions...' : 'Type to filter departments...'}
                                className="w-full max-w-2xl mx-auto block bg-gray-900/80 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 shadow-inner"
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                        
                        {subTab === 'professions' && (
                            <div>
                                {filteredProfessionGroups.map(group => {
                                    const sortedList = group.list.slice().sort((a, b) => {
                                        const qualA = isProfessionQualified(a, attributes) ? 1 : 0;
                                        const qualB = isProfessionQualified(b, attributes) ? 1 : 0;
                                        if (qualB !== qualA) return qualB - qualA;
                                        return a.name.localeCompare(b.name);
                                    });

                                    return sortedList.length > 0 && (
                                        <div key={group.name} className="mb-12">
                                            <h4 className={`text-2xl font-semibold text-left mb-4 text-gray-300 border-b-2 ${group.borderColor} pb-2`}>
                                                {group.name}
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pt-4">
                                                {sortedList.map(p => (
                                                    <ProfessionCard
                                                        key={p.name}
                                                        profession={p}
                                                        attributes={attributes}
                                                        isSelected={selectedProfession?.name === p.name}
                                                        onSelect={() => handleSelectProfession(p.name)}
                                                        onShowInfo={() => onShowProfessionInfo(p)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                                {professionFilterText.trim() && filteredProfessionGroups.length === 0 && (
                                    <p className="text-center text-lg text-gray-500 py-8">No professions match your filter.</p>
                                )}
                                {professionsToShow.length === 0 && selectedDepartment && !professionFilterText.trim() && (
                                    <p className="text-center text-lg text-gray-500 py-8">No standard professions are available for the selected department. Clear the department selection to see all professions.</p>
                                )}
                            </div>
                        )}

                        {subTab === 'departments' && (
                             <div>
                                {Object.keys(filteredDepartmentsByCountry).length > 0 ? (
                                    Object.keys(filteredDepartmentsByCountry).map(country => { const depts = filteredDepartmentsByCountry[country]; return (
                                        <div key={country} className="mb-12">
                                            <h4 className="text-2xl font-semibold text-left mb-4 text-gray-300 border-b-2 border-green-700 pb-2">
                                                {country} Agencies & Units
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 pt-4">
                                                {depts.map(d => (
                                                    <DepartmentCard
                                                        key={d.stub}
                                                        department={d}
                                                        isSelected={selectedDepartment?.stub === d.stub || selectedProfession?.name === d.stub}
                                                        onSelect={() => handleDepartmentSelection(d.stub)}
                                                        onShowInfo={() => {
                                                            if (d.isProfessionAsDept) {
                                                                const prof = professions.find(p => p.name === d.stub);
                                                                if (prof) onShowProfessionInfo(prof);
                                                            } else {
                                                                onShowDepartmentInfo(d);
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )})
                                ) : (
                                    <p className="text-center text-lg text-gray-500 py-8">
                                        {departmentFilterText.trim()
                                            ? 'No departments or specialized units match your filter.'
                                            : 'No specific departments or specialized units are available for this profession.'}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
            {rollHistory.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-300">Roll History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rollHistory.map((roll, index) => (
                        <RollHistoryCard key={index} roll={roll} onRestore={() => onRestoreRoll(roll)} />
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}
