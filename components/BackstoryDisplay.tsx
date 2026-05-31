import React from 'react';

interface BackstoryDisplayProps {
  text: string;
}

const parseBold = (text: string): React.ReactNode => {
    // Split by the bold markdown, keeping the delimiters
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            // If it's a bold part, render it as a <strong> element with green text
            return <strong key={i} className="text-green-400">{part.slice(2, -2)}</strong>;
        }
        // Otherwise, return the text part as is
        return part;
    });
};

export const BackstoryDisplay: React.FC<BackstoryDisplayProps> = ({ text }) => {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim() !== '');

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 max-h-[60vh] overflow-y-auto text-gray-300 leading-relaxed space-y-4">
      {paragraphs.map((p, index) => (
        <p key={index}>{parseBold(p)}</p>
      ))}
    </div>
  );
};