import React from 'react';
import type { DGItemExpense } from '../../types';

const expenseStyles: Record<DGItemExpense, { text: string; bg: string; border: string; }> = {
    'None':       { text: 'text-gray-400',   bg: 'bg-gray-800/50',   border: 'border-gray-700' },
    'Incidental': { text: 'text-green-300',  bg: 'bg-green-900/50',  border: 'border-green-800' },
    'Standard':   { text: 'text-sky-300',    bg: 'bg-sky-900/50',    border: 'border-sky-800' },
    'Unusual':    { text: 'text-yellow-300', bg: 'bg-yellow-900/50', border: 'border-yellow-800' },
    'Major':      { text: 'text-orange-400', bg: 'bg-orange-900/50', border: 'border-orange-800' },
    'Extreme':    { text: 'text-red-400',    bg: 'bg-red-900/50',    border: 'border-red-800' },
};

const TriangleIcon: React.FC<{ colorClass: string }> = ({ colorClass }) => (
    <svg viewBox="0 0 10 10" className={`w-2.5 h-2.5 mr-1.5 ${colorClass}`} fill="currentColor">
        <polygon points="5,1 9,8 1,8" />
    </svg>
);

export const ExpensePill: React.FC<{ expense: DGItemExpense }> = ({ expense }) => {
    const styles = expenseStyles[expense];
    if (!styles) return null;

    return (
        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${styles.bg} ${styles.border} ${styles.text}`}>
            <TriangleIcon colorClass={styles.text} />
            {expense}
        </div>
    );
};
