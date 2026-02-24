import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface TabButtonProps {
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
    children: React.ReactNode;
    shouldGlow?: boolean;
    isDisabled?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({ isActive, isCompleted, onClick, children, shouldGlow, isDisabled }) => (
    <button
        onClick={onClick}
        disabled={isDisabled}
        className={`flex items-center justify-center py-3 px-4 sm:px-6 rounded-t-lg font-black text-lg uppercase tracking-wider transform transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400/80 focus:z-10 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600 disabled:hover:bg-gray-800 ${
            isActive
                ? 'text-gray-900 bg-green-500 shadow-lg shadow-green-500/20'
                : isCompleted
                ? 'text-green-300 bg-green-900/40 hover:bg-green-900/60'
                : 'text-gray-500 bg-gray-800/60 hover:bg-gray-700/80'
        } ${shouldGlow && !isDisabled ? 'animate-glow-indicator' : ''}`}
        style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
        role="tab"
        aria-selected={isActive}
    >
        {isCompleted && !isActive && <CheckIcon className="h-5 w-5 mr-2 text-green-400" />}
        {children}
    </button>
);