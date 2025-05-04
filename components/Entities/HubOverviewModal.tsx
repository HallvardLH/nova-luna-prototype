'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import HubOverview from './Overviews/HubOverview';

export default function HubOverviewModal() {
    const isOpen = useModalStore((state) => state.modals.hubOverview);
    const close = useModalStore((state) => state.close);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('hubOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Hubs</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <HubOverview />
                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}