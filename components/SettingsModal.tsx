import React from 'react';
import { useSheetContext, SheetSourceType } from '../context/SheetContext';
import { SOURCES } from '../third-party/manifest';
import type { SourceID } from '../types';

interface SettingsModalProps { onClose: () => void; }

const RadioOption: React.FC<{ id: string; label: string; description: string; value: SheetSourceType; currentValue: SheetSourceType; onChange: (value: SheetSourceType) => void; }> = ({ id, label, description, value, currentValue, onChange }) => (
    <div className="flex items-start">
        <input id={id} type="radio" name="sheet-source" value={value} checked={currentValue === value} onChange={() => onChange(value)} className="mt-1 h-4 w-4 text-yellow-500 border-gray-500 focus:ring-yellow-400" />
        <label htmlFor={id} className="ml-3">
            <span className="block text-md font-bold text-gray-200">{label}</span>
            <span className="block text-sm text-gray-400">{description}</span>
        </label>
    </div>
);

const UrlInput: React.FC<{ label: string, value: string, onChange: (value: string) => void }> = ({ label, value, onChange }) => (
    <div className="mt-2">
        <label className="block text-sm font-medium text-gray-400">{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 mt-1 text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400" />
    </div>
);

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { sourceType, setSourceType, externalUrls, setExternalUrl, selfHostedUrl, setSelfHostedUrl } = useSheetContext();

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="settings-modal-title">
            <div className="bg-gray-800 border-2 border-yellow-500/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 id="settings-modal-title" className="text-2xl font-bold text-yellow-400">Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                <div className="p-6 overflow-y-auto space-y-6">
                    <section>
                        <h3 className="text-lg font-bold text-gray-300 mb-3">Character Sheet Source</h3>
                        <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                            <RadioOption id="source-internal" label="Internal Development" description="Use sheet files in the local /public/sheet/ folder. (For developers)" value="internal" currentValue={sourceType} onChange={setSourceType} />
                            <RadioOption id="source-external" label="Default External URLs" description="Use official, externally hosted PDFs via CDN for best compatibility." value="external" currentValue={sourceType} onChange={setSourceType} />
                            <RadioOption id="source-self-hosted" label="Self-Hosted" description="Provide a base URL to a folder where you are hosting the PDF files." value="self-hosted" currentValue={sourceType} onChange={setSourceType} />
                        </div>
                    </section>
                    
                    {sourceType === 'external' && (
                        <section>
                            <h3 className="text-lg font-bold text-gray-300 mb-3">External URLs</h3>
                            <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700 max-h-64 overflow-y-auto">
                                {SOURCES.map(source => (
                                    <div key={source.id}>
                                        <h4 className="font-semibold text-gray-200">{source.name}</h4>
                                        <UrlInput label="Default Sheet URL" value={externalUrls[source.id]?.defaultSheet || ''} onChange={(val) => setExternalUrl(source.id, 'defaultSheet', val)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {sourceType === 'self-hosted' && (
                        <section>
                            <h3 className="text-lg font-bold text-gray-300 mb-3">Self-Hosted Base URL</h3>
                             <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                <p className="text-sm text-gray-400">Enter the base URL to the directory containing the PDF files. The app will append the standard filename (e.g., `delta_green_sheet.pdf`) to this URL.</p>
                                <UrlInput label="Base URL" value={selfHostedUrl} onChange={setSelfHostedUrl} />
                            </div>
                        </section>
                    )}
                </div>
                 <footer className="p-4 border-t border-gray-700 flex-shrink-0 text-right">
                    <button onClick={onClose} className="bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">Done</button>
                </footer>
            </div>
        </div>
    );
};
