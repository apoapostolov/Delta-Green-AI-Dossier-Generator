

import React from 'react';
import type { Event } from '../../sim/types';

interface CareerTimelineProps {
    events: Event[];
}

const normalizeEventKind = (kind: string): string => {
    if (kind === 'KIA') return 'KIA';
    // Insert a space before a capital letter that is preceded by a lowercase letter.
    // e.g. "PermanentInjury" becomes "Permanent Injury"
    // e.g. "DGIncident" becomes "DG Incident"
    return kind.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
};

const EventConsequences: React.FC<{ outcome: Event['outcome'] }> = ({ outcome }) => {
    const consequences: React.ReactNode[] = [];

    if (outcome.attributeDelta) {
        for (const [attr, change] of Object.entries(outcome.attributeDelta)) {
            if (change !== 0) {
                // FIX: Cast 'change' to number to resolve comparison errors. The value from Object.entries was being inferred as 'unknown'.
                const sign = (change as number) > 0 ? '+' : '';
                const color = (change as number) > 0 ? 'text-green-400' : 'text-red-400';
                consequences.push(<li key={`attr-${attr}`} className="whitespace-nowrap"><span>{attr}:</span> <span className={`font-bold ${color}`}>{sign}{change}</span></li>);
            }
        }
    }
    if (outcome.skillDelta) {
        for (const [skill, change] of Object.entries(outcome.skillDelta)) {
            if (change !== 0) {
                 consequences.push(<li key={`skill-${skill}`} className="whitespace-nowrap"><span>{skill}:</span> <span className="font-bold text-green-400">+{change}%</span></li>);
            }
        }
    }
    if (outcome.maxHpDelta) {
        consequences.push(<li key="hp" className="whitespace-nowrap"><span>Max HP:</span> <span className="font-bold text-red-400">{outcome.maxHpDelta}</span></li>);
    }
    if (outcome.sanDelta) {
        const change = outcome.sanDelta;
        const sign = change > 0 ? '+' : '';
        const color = change > 0 ? 'text-green-400' : 'text-red-400';
        consequences.push(<li key="san" className="whitespace-nowrap"><span>SAN:</span> <span className={`font-bold ${color}`}>{sign}{change}</span></li>);
    }
    if (outcome.bondDelta) {
        consequences.push(<li key="bond" className="whitespace-nowrap"><span>Bond:</span> <span className="font-bold text-red-400">{outcome.bondDelta}</span></li>);
    }

    if (consequences.length === 0) {
        return null;
    }

    return (
        <div className="mt-2 text-xs font-mono text-gray-400 bg-black/30 p-2 rounded-md border border-gray-600/50">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {consequences}
            </ul>
        </div>
    );
};


const EventItem: React.FC<{ event: Event }> = ({ event }) => {
    const isCritical = event.kind === 'KIA' || event.kind === 'PermanentInjury';
    const isWeird = event.kind === 'Weird';
    const isPositive = ['Promotion', 'Commendation', 'Award'].includes(event.kind);
    
    const { success, isCriticalSuccess, isFumble } = event.check;
    const successColor = success ? 'text-green-400' : 'text-red-400';

    const getIcon = () => {
        if (isCritical) {
            return (
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-gray-900 bg-red-900">
                    <svg className="w-3 h-3 text-red-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"></path></svg>
                </span>
            );
        }
        if (isWeird) {
            return (
                <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-gray-900 bg-purple-900">
                    <svg className="w-3 h-3 text-purple-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" fillRule="evenodd"></path></svg>
                </span>
            );
        }
        return (
             <span className="absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-gray-900 bg-blue-900">
                <svg className="w-2.5 h-2.5 text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </span>
        );
    };

    const renderResult = () => {
        if (isFumble) {
            return <span className="px-2 py-0.5 text-xs font-black text-black bg-red-500 rounded-full">CRIT FAILURE</span>;
        }
        if (isCriticalSuccess) {
            return <span className="font-bold text-yellow-400 animate-critical-glow">CRIT SUCCESS</span>;
        }
        return <div className={`font-bold ${successColor}`}>{success ? 'SUCCESS' : 'FAILURE'}</div>;
    };

  return (
    <li className="mb-6 ml-6">            
        {getIcon()}
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`flex items-center mb-1 text-lg font-semibold ${isCritical ? 'text-red-300' : isWeird ? 'text-purple-300' : 'text-gray-200'}`}>
                        {normalizeEventKind(event.kind)} 
                        <span className={`text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 ${isCritical ? 'bg-red-800 text-red-300' : isWeird ? 'bg-purple-800 text-purple-300' : 'bg-blue-800 text-blue-300'}`}>{event.year}</span>
                    </h3>
                    <p className={`text-sm font-normal ${isPositive ? 'text-gray-300' : 'text-gray-400'}`}>{event.detail}</p>
                </div>
                {event.check && (
                    <div className="text-xs text-right text-gray-500 flex-shrink-0 ml-4 min-w-[120px]">
                        <div className="font-mono">
                            {event.check.name} Check: <span className="font-bold">{event.check.roll}</span> vs {event.check.target}
                        </div>
                        {renderResult()}
                    </div>
                )}
            </div>
            {event.narrative && <p className="text-base font-normal text-sky-300 italic mt-2 border-t border-gray-700/50 pt-2">"{event.narrative}"</p>}
            <EventConsequences outcome={event.outcome} />
        </div>
    </li>
  );
};


export const CareerTimeline: React.FC<CareerTimelineProps> = ({ events }) => {
    if (events.length === 0) {
        return <p className="text-center text-gray-500 italic py-4">No significant events logged for this period.</p>
    }
    return (
        <div className="max-h-96 overflow-y-auto p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ol className="relative border-l border-gray-700">                  
                {events.map((event, index) => <EventItem key={index} event={event} />)}
            </ol>
        </div>
    );
};