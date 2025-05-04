'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import EventOverview from './Overviews/EventOverview';

export default function EventOverviewModal() {
    const isOpen = useModalStore((state) => state.modals.eventOverview);
    const close = useModalStore((state) => state.close);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('eventOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Events</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <EventOverview />
                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}
