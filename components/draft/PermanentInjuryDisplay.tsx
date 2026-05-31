import React from 'react';

const parseBold = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export const PermanentInjuryDisplay: React.FC<{ report: string }> = ({ report }) => {
    const paragraphs = report.split(/\n\s*\n/).filter(p => p.trim() !== '');

    return (
        <div className="bg-orange-900/40 border-2 border-orange-500/80 text-white p-6 rounded-lg my-8">
            <h3 className="text-3xl font-black uppercase text-orange-300 text-center">Permanent Medical Record</h3>
            <p className="mt-2 text-orange-200/80 text-center mb-6">The following injuries have had a lasting impact on the agent's operational readiness.</p>
            <div className="bg-black/30 p-4 rounded-md border border-orange-800/50 text-orange-200/90 leading-relaxed space-y-4 max-h-60 overflow-y-auto">
                {paragraphs.map((p, index) => (
                    <p key={index}>{parseBold(p)}</p>
                ))}
            </div>
        </div>
    );
};