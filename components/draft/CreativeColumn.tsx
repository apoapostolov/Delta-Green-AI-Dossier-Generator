import React from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { CharacterDetailsColumn } from './CharacterDetailsColumn';

interface CreativeColumnProps {
    onShowPromptInfo: () => void;
    dob: string;
    setDob: (dob: string) => void;
}

export const CreativeColumn: React.FC<CreativeColumnProps> = ({ onShowPromptInfo, dob, setDob }) => {
    // FIX: Fetched additional context to provide the required props to CharacterDetailsColumn, resolving a type error.
    const { ai, aggregatedData, selectedDepartment } = useCharacterContext();

    return (
        <div className="space-y-6">
            <CharacterDetailsColumn 
                decades={aggregatedData.DECADES}
                selectedDecade={ai.decade}
                onDecadeChange={ai.setDecade}
                selectedDepartment={selectedDepartment}
                dob={dob} 
                setDob={setDob}
                dobOverwrittenByCareer={ai.dobOverwrittenByCareer}
            />
        </div>
    );
};