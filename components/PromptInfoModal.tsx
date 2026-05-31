import React from 'react';

interface PromptInfoModalProps {
  prompt?: string;
  tabs?: { id: string; label: string; content: string }[];
  onClose: () => void;
  title: string;
  description?: string;
  maxHeightClassName?: string;
}

export const PromptInfoModal: React.FC<PromptInfoModalProps> = ({
  prompt,
  tabs,
  onClose,
  title,
  description = 'This is the exact text prompt that will be sent to the AI to generate the content.',
  maxHeightClassName = 'max-h-[90vh]',
}) => {
  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id || 'prompt');
  const activeContent = tabs?.find((tab) => tab.id === activeTab)?.content || prompt || '';

  React.useEffect(() => {
    setActiveTab(tabs?.[0]?.id || 'prompt');
  }, [tabs]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
    >
      <div
        className={`bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl ${maxHeightClassName} flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 id="prompt-modal-title" className="text-2xl font-bold text-yellow-400">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {tabs && tabs.length > 0 && (
          <div className="px-6 pt-4">
            <div className="inline-flex rounded-lg border border-gray-700 bg-gray-900/60 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'bg-yellow-600 text-gray-900' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-yellow-600/70">
          {description ? <p className="text-gray-400 mb-4">{description}</p> : null}
          <pre className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-gray-300 whitespace-pre-wrap font-sans text-sm">
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
