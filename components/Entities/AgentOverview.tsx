import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButton,
    EuiButtonEmpty,
} from '@elastic/eui';
import { useModalStore } from '@/stores/modalStore';

export default function AgentOverview() {
    const isOpen = useModalStore((state) => state.modals.agentOverview);
    const close = useModalStore((state) => state.close);
    const open = useModalStore((state) => state.open);

    return (
        <div>
            <EuiButton onClick={() => open('agentOverview')}>Open Agent Overview</EuiButton>

            {isOpen && (
                <EuiModal onClose={() => close('agentOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Agent Overview</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <p>Overview of agents goes here.</p>
                    </EuiModalBody>

                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={() => close('agentOverview')}>Close</EuiButtonEmpty>
                    </EuiModalFooter>
                </EuiModal>
            )}
        </div>
    );
}
