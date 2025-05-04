'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import ObjectOverview from './Overviews/ObjectOverview';

export default function ObjectOverviewModal() {
    const isOpen = useModalStore((state) => state.modals.objectOverview);
    const close = useModalStore((state) => state.close);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('objectOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Objects</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <ObjectOverview />
                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}
