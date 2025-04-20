import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButtonEmpty,
} from '@elastic/eui';
import { useModalStore } from '@/stores/modalStore';

export default function AgentOverview() {
    const isOpen = useModalStore((state) => state.modals.agentOverview);
    const close = useModalStore((state) => state.close);

    return (
        <div>

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
