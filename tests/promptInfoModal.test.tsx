import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PromptInfoModal } from '../components/PromptInfoModal';

describe('PromptInfoModal', () => {
    it('renders tabbed prompt content and switches between prompts', () => {
        const onClose = vi.fn();

        render(
            <PromptInfoModal
                title="AI Item Generation Prompts"
                description=""
                tabs={[
                    { id: 'prompt-1', label: 'Prompt 1', content: 'First prompt body' },
                    { id: 'prompt-2', label: 'Prompt 2', content: 'Second prompt body' },
                ]}
                onClose={onClose}
            />,
        );

        expect(screen.getByText('First prompt body')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Prompt 2' }));
        expect(screen.getByText('Second prompt body')).toBeInTheDocument();
    });
});
