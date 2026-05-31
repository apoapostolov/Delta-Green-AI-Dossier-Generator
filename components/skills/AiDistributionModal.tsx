import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AIIcon } from '../icons/AIIcon';
import type { DgSkillDistributionAllocation, DgSkillDistributionAnalysis } from '../../lib/ai/dg-skill-distribution';

interface AiDistributionModalProps {
    open: boolean;
    occupationName: string;
    description: string;
    onDescriptionChange: (description: string) => void;
    onClose: () => void;
    onSubmit: (
        description: string,
        onStageChange: (stage: 'analyzing' | 'distributing' | null) => void,
    ) => Promise<void>;
    onApply: () => void;
    onRetry: (
        description: string,
        onStageChange: (stage: 'analyzing' | 'distributing' | null) => void,
    ) => Promise<void>;
    review: {
        analysis: DgSkillDistributionAnalysis;
        rationale?: string;
        coreSkills: DgSkillDistributionAllocation[];
        supplementalSkills: DgSkillDistributionAllocation[];
        personalInterests: DgSkillDistributionAllocation[];
    } | null;
}

type ReviewTab = 'distribution' | 'notes';

const renderAllocationList = (items: DgSkillDistributionAllocation[]) => {
    if (!items.length) return <p className="text-sm text-gray-500">None.</p>;
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={`${item.skill}-${item.improvements}`} className="flex items-start justify-between gap-3 rounded-md border border-gray-700 bg-black/20 px-3 py-2">
                    <span className="text-sm font-medium text-gray-100">{item.skill}</span>
                    <span className="text-sm text-green-300 whitespace-nowrap">+{item.improvements * 20}%</span>
                </li>
            ))}
        </ul>
    );
};

export const AiDistributionModal: React.FC<AiDistributionModalProps> = ({
    open,
    occupationName,
    description,
    onDescriptionChange,
    onClose,
    onSubmit,
    onApply,
    onRetry,
    review,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stage, setStage] = useState<'analyzing' | 'distributing' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ReviewTab>('distribution');

    useEffect(() => {
        if (!open) {
            setError(null);
            setIsSubmitting(false);
            setStage(null);
            setActiveTab('distribution');
        }
    }, [open]);

    if (!open || typeof document === 'undefined') return null;

    const handleGeneration = async (
        submitter: (value: string, onStageChange: (stage: 'analyzing' | 'distributing' | null) => void) => Promise<void>,
    ) => {
        const trimmed = description.trim();
        if (!trimmed) {
            setError('Please describe the agent before asking for a distribution.');
            return;
        }

        setIsSubmitting(true);
        setStage(null);
        setError(null);
        try {
            await submitter(trimmed, setStage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'AI distribution failed.');
        } finally {
            setIsSubmitting(false);
            setStage(null);
        }
    };

    const actionLabel = stage === 'analyzing'
        ? 'Analyzing...'
        : stage === 'distributing'
            ? 'Distributing...'
            : isSubmitting
                ? 'Working...'
                : 'Distribute Skills';

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-labelledby="ai-distribution-title" onMouseDown={onClose}>
            <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between gap-3 border-b border-gray-700 bg-gray-900/80 p-4">
                    <div>
                        <h2 id="ai-distribution-title" className="flex items-center gap-2 text-2xl font-bold text-green-300">
                            <AIIcon className="h-5 w-5" />
                            AI Distribution
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Describe the agent and let the AI assign Delta Green bonus advancements for {occupationName}.
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white" aria-label="Close AI distribution dialog">
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 flex-col">
                    {!review ? (
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-gray-400">Agent description</span>
                                <textarea
                                    value={description}
                                    onChange={(e) => onDescriptionChange(e.target.value)}
                                    placeholder="Describe the agent's background, strengths, assignments, hobbies, traumas, specialist role, and anything else that should shape the skill spread."
                                    className="min-h-48 w-full rounded-md border border-gray-600 bg-gray-900/60 p-3 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </label>

                            {error && <div className="rounded-md border border-red-500/50 bg-red-950/60 px-3 py-2 text-sm text-red-200">{error}</div>}

                            <div className="flex items-center justify-end gap-3">
                                <button type="button" onClick={onClose} className="rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600" disabled={isSubmitting}>Cancel</button>
                                <button type="button" onClick={() => void handleGeneration(onSubmit)} className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
                                    <AIIcon className="h-4 w-4" />
                                    {actionLabel}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="border-b border-gray-700 bg-gray-900/40 px-4 pt-3">
                                <div className="inline-flex rounded-lg border border-gray-700 bg-gray-800 p-1">
                                    <button type="button" onClick={() => setActiveTab('distribution')} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${activeTab === 'distribution' ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-gray-700'}`}>Distribution</button>
                                    <button type="button" onClick={() => setActiveTab('notes')} className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${activeTab === 'notes' ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-gray-700'}`}>AI Notes</button>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto p-4">
                                {activeTab === 'distribution' ? (
                                    <div className="space-y-4">
                                        <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-4 space-y-4">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-gray-100">AI Decision</h3>
                                                <p className="text-sm text-gray-400">The AI analyzed the brief and proposed a legal Delta Green advancement spread.</p>
                                                {review.rationale && <p className="text-sm text-gray-200">{review.rationale}</p>}
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-3">
                                                <section className="rounded-lg border border-gray-700 bg-black/20 p-3">
                                                    <h4 className="mb-3 text-sm font-semibold text-green-300">Core Skills</h4>
                                                    {renderAllocationList(review.coreSkills)}
                                                </section>
                                                <section className="rounded-lg border border-gray-700 bg-black/20 p-3">
                                                    <h4 className="mb-3 text-sm font-semibold text-green-300">Supplemental Skills</h4>
                                                    {renderAllocationList(review.supplementalSkills)}
                                                </section>
                                                <section className="rounded-lg border border-gray-700 bg-black/20 p-3">
                                                    <h4 className="mb-3 text-sm font-semibold text-green-300">Personal Interests</h4>
                                                    {renderAllocationList(review.personalInterests)}
                                                </section>
                                            </div>
                                            <label className="block">
                                                <span className="mb-2 block text-sm font-medium text-gray-400">Agent description</span>
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => onDescriptionChange(e.target.value)}
                                                    className="min-h-28 w-full rounded-md border border-gray-600 bg-gray-950/60 p-3 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                                                />
                                            </label>
                                        </div>
                                        {error && <div className="rounded-md border border-red-500/50 bg-red-950/60 px-3 py-2 text-sm text-red-200">{error}</div>}
                                    </div>
                                ) : (
                                    <div className="space-y-4 rounded-xl border border-gray-700 bg-gray-900/40 p-4">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold text-gray-100">AI Notes</h3>
                                            <p className="text-sm text-gray-400">Interpretation details and caution flags from the AI pass.</p>
                                        </div>
                                        <div className="space-y-3 text-sm text-gray-200">
                                            {review.analysis.summary && <p>{review.analysis.summary}</p>}
                                            {review.analysis.themes.length > 0 && <p><span className="font-medium text-green-300">Themes:</span> {review.analysis.themes.join(', ')}</p>}
                                            {review.analysis.likelyCoreSkills.length > 0 && <p><span className="font-medium text-green-300">Likely core:</span> {review.analysis.likelyCoreSkills.join(', ')}</p>}
                                            {review.analysis.likelySupportSkills.length > 0 && <p><span className="font-medium text-green-300">Likely support:</span> {review.analysis.likelySupportSkills.join(', ')}</p>}
                                            {review.analysis.cautions.length > 0 && <p><span className="font-medium text-green-300">Cautions:</span> {review.analysis.cautions.join(', ')}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-700 bg-gray-900/70 p-4 flex flex-wrap items-center justify-end gap-3">
                                <button type="button" onClick={onClose} className="rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600" disabled={isSubmitting}>Close</button>
                                <button type="button" onClick={() => void handleGeneration(onRetry)} className="rounded-md border border-green-600 bg-transparent px-4 py-2 text-sm font-semibold text-green-300 hover:bg-green-900/30 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>Retry</button>
                                <button type="button" onClick={onApply} className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600" disabled={isSubmitting}>
                                    <AIIcon className="h-4 w-4" />
                                    Apply Distribution
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
};
