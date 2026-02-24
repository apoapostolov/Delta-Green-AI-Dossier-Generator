import React from 'react';

interface TerminalConsequenceDisplayProps {
    consequence: string;
}

const CONSEQUENCES: Record<string, { title: string; text: string; colors: { bg: string; border: string; titleText: string; bodyText: string; } }> = {
  "Reprimand": { 
      title: "FORMAL REPRIMAND", 
      text: "A black mark has been placed on your permanent record. Future requisitions will face increased scrutiny. You are considered on probation.",
      colors: {
          bg: 'bg-yellow-900/80',
          border: 'border-yellow-500',
          titleText: 'text-yellow-300',
          bodyText: 'text-yellow-200',
      }
  },
  "Suspension and/or Transfer": { 
      title: "SUSPENSION / TRANSFER", 
      text: "You have been suspended from active duty pending a full investigation. A transfer to an undesirable post is likely. Your career is in jeopardy.",
      colors: {
          bg: 'bg-orange-900/80',
          border: 'border-orange-500',
          titleText: 'text-orange-300',
          bodyText: 'text-orange-200',
      }
  },
  "Firing and/or prosecution": { 
      title: "TERMINATION / PROSECUTION", 
      text: "Your employment has been terminated. Depending on the severity of the breach, you may face federal prosecution. Your career is over.",
      colors: {
          bg: 'bg-red-900/80',
          border: 'border-red-500',
          titleText: 'text-red-300',
          bodyText: 'text-red-200',
      }
  }
};

export const TerminalConsequenceDisplay: React.FC<TerminalConsequenceDisplayProps> = ({ consequence }) => {
    const details = CONSEQUENCES[consequence];
    if (!details) {
        return null;
    }

    return (
        <div className={`p-4 mb-4 ${details.colors.bg} border-4 ${details.colors.border} rounded-lg text-center`}>
            <h4 className={`text-2xl font-black ${details.colors.titleText}`}>{details.title}</h4>
            <p className={`mt-2 ${details.colors.bodyText}`}>{details.text}</p>
        </div>
    );
};