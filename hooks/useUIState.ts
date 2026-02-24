import { useState, useCallback } from 'react';
import type { Tab, ToastType } from '../types';

export const useUIState = () => {
    const [activeTab, _setActiveTab] = useState<Tab>('stats');
    const [completedTabs, setCompletedTabs] = useState<Set<Tab>>(new Set());
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
    const [isBackstoryPromptModalVisible, setIsBackstoryPromptModalVisible] = useState(false);
    const [isSourcesModalVisible, setIsSourcesModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

    const setActiveTab = useCallback((tab: Tab) => {
        _setActiveTab(tab);
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    const setToastMessage = useCallback((message: string | null, type: ToastType = 'error') => {
        if (message) {
            setToast({ message, type });
        } else {
            setToast(null);
        }
    }, []);

    const reset = useCallback(() => {
        setActiveTab('stats');
        setCompletedTabs(new Set());
    }, [setActiveTab]);

    return {
        activeTab, setActiveTab,
        completedTabs, setCompletedTabs,
        toast,
        setToastMessage,
        isPromptModalVisible, setIsPromptModalVisible,
        isBackstoryPromptModalVisible, setIsBackstoryPromptModalVisible,
        isSourcesModalVisible, setIsSourcesModalVisible,
        isSettingsModalVisible, setIsSettingsModalVisible,
        reset,
    };
};