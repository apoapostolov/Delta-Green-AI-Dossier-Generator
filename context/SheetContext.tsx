import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { SourceID } from '../types';
import { SHEET_CONFIG as DG_SHEET_CONFIG } from '../third-party/sheet-config';

export type SheetSourceType = 'internal' | 'external' | 'self-hosted';

interface SheetContextType {
    sourceType: SheetSourceType;
    setSourceType: (type: SheetSourceType) => void;
    externalUrls: Partial<Record<SourceID, { defaultSheet: string }>>;
    setExternalUrl: (sourceId: SourceID, type: 'defaultSheet', url: string) => void;
    selfHostedUrl: string;
    setSelfHostedUrl: (url: string) => void;
    getSheetPath: (sourceId: SourceID, isSpellcaster: boolean, sheetConfig: any) => string;
}

const DEFAULT_EXTERNAL_URLS: Partial<Record<SourceID, { defaultSheet: string }>> = {
    'delta-green': {
        defaultSheet: 'https://cdn.jsdelivr.net/gh/apoapostolov/rpg-sheets@main/deltagreensheet.pdf',
    },
};

const SheetContext = createContext<SheetContextType | null>(null);

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sourceType, setSourceTypeState] = useState<SheetSourceType>(() => {
        const saved = localStorage.getItem('sheetSourceType') as SheetSourceType;
        if (saved) return saved;
        // Default to external CDN on production-like environments, internal for local dev
        return window.location.hostname.endsWith('run.app') ? 'external' : 'internal';
    });
    const [externalUrls, setExternalUrlsState] = useState<Partial<Record<SourceID, { defaultSheet: string }>>>(() => {
        const saved = localStorage.getItem('sheetExternalUrls');
        return saved ? JSON.parse(saved) : DEFAULT_EXTERNAL_URLS;
    });
    const [selfHostedUrl, setSelfHostedUrlState] = useState<string>(() => {
        return localStorage.getItem('sheetSelfHostedUrl') || '';
    });
    
    useEffect(() => { localStorage.setItem('sheetSourceType', sourceType); }, [sourceType]);
    useEffect(() => { localStorage.setItem('sheetExternalUrls', JSON.stringify(externalUrls)); }, [externalUrls]);
    useEffect(() => { localStorage.setItem('sheetSelfHostedUrl', selfHostedUrl); }, [selfHostedUrl]);

    const setSourceType = (type: SheetSourceType) => setSourceTypeState(type);
    const setSelfHostedUrl = (url: string) => setSelfHostedUrlState(url);
    const setExternalUrl = (sourceId: SourceID, type: 'defaultSheet', url: string) => {
        setExternalUrlsState(prev => ({
            ...prev,
            [sourceId]: { ...prev[sourceId], [type]: url }
        }));
    };
    
    const getSheetPath = (sourceId: SourceID, isSpellcaster: boolean, sheetConfig: any): string => {
        const config = sheetConfig || DG_SHEET_CONFIG;
        
        switch (sourceType) {
            case 'external':
                const urls = externalUrls[sourceId];
                return urls?.defaultSheet || config.defaultSheet;
            case 'self-hosted':
                if (!selfHostedUrl) return config.defaultSheet;
                const base = selfHostedUrl.endsWith('/') ? selfHostedUrl : `${selfHostedUrl}/`;
                const filename = (config.defaultSheet as string).split('/').pop() || `${sourceId}_sheet.pdf`;
                return `${base}${filename}`;
            case 'internal':
            default:
                return config.defaultSheet;
        }
    };

    const value = useMemo(() => ({
        sourceType, setSourceType, externalUrls, setExternalUrl, selfHostedUrl, setSelfHostedUrl, getSheetPath,
    }), [sourceType, externalUrls, selfHostedUrl]);

    return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
};

export const useSheetContext = () => {
    const context = useContext(SheetContext);
    if (!context) throw new Error('useSheetContext must be used within a SheetProvider');
    return context;
};