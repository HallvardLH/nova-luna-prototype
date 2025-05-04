'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import AgentOverview from './Overviews/AgentOverview';

export default function AgentOverviewModal() {
    const isOpen = useModalStore((state) => state.modals.agentOverview);
    const close = useModalStore((state) => state.close);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('agentOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Agents</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <AgentOverview />
                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}