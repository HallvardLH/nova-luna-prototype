'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiText,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';

export default function OnboardingGuide() {
    const isOpen = useModalStore((state) => state.modals.onboardingGuide);
    const close = useModalStore((state) => state.close);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('onboardingGuide')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Guide to NOVA LUNA STUDIO Game creation</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiText style={{ textAlign: "center", fontSize: "1.5rem" }}>
                        This guide will show you how the game creation works
                    </EuiText>

                    <EuiModalBody>

                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}