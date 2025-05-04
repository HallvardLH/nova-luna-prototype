'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import TaskOverview from './Overviews/TaskOverview';

export default function TaskOverviewModal() {
    const isOpen = useModalStore((state) => state.modals.taskOverview);
    const close = useModalStore((state) => state.close);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('taskOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Tasks</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <TaskOverview />
                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}
