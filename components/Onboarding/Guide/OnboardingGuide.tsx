'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiText,
    EuiFlexGroup,
    EuiButton,
    EuiIcon,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import styles from './OnboardingGuide.module.css';
import Image from 'next/image';

export default function OnboardingGuide() {
    const isOpen = useModalStore((state) => state.modals.onboardingGuide);
    const close = useModalStore((state) => state.close);

    const entities: Array<"agent" | "hub" | "task" | "event" | "object"> = [
        "agent",
        "hub",
        "object",
        "task",
        "event",
    ];

    return (
        <div>
            {isOpen && (
                <EuiModal maxWidth="75vw" onClose={() => close('onboardingGuide')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Guide to NOVA LUNA STUDIO Game creation</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <EuiText style={{ textAlign: "center", fontSize: "1.5rem" }}>
                            This guide will show you how the game creation works
                        </EuiText>

                        <EuiFlexGroup style={{ justifyContent: "space-around", marginTop: "2rem", marginBottom: "2rem" }}>
                            {entities.map((entity) => (
                                <div key={entity}>
                                    <EuiText style={{ textAlign: "center", fontSize: "1.5rem" }}>
                                        {entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}
                                    </EuiText>
                                    <EntityIcon size={50} entity={entity} />
                                </div>
                            ))}
                        </EuiFlexGroup>

                        <div className={styles.guideContainer}>
                            <div className={styles.guideSection}>
                                <EuiText className={styles.guideTitle}>
                                    <h2>Navigation</h2>
                                </EuiText>
                                <EuiText className={styles.guideText}>
                                    Use the arrows to navigate through game creation. You can also use the icons and the menu-bar to on your left-hand side.
                                </EuiText>
                                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                                    <Image
                                        src="/images/arrow-left.webp"
                                        alt=""
                                        width={70}
                                        height={175}
                                    />
                                    <Image
                                        src="/images/arrow-right.webp"
                                        alt=""
                                        width={70}
                                        height={175}
                                    />
                                </div>
                            </div>
                            <div className={styles.guideSection}>
                                <EuiText className={styles.guideTitle}>
                                    <h2>Navigation</h2>
                                </EuiText>
                                <EuiText className={styles.guideText}>
                                    Use the arrows to navigate through game creation. You can also use the icons and the menu-bar to on your left-hand side.
                                </EuiText>
                                <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                                    <EuiButton
                                        iconType={() => <EuiIcon type="plus" style={{ fill: 'white' }} />}

                                        className={styles.agentButton}
                                    >
                                        Add agent
                                    </EuiButton>
                                    <EuiButton
                                        iconType={() => <EuiIcon type="plus" style={{ fill: 'white' }} />}

                                        className={styles.hubButton}
                                    >
                                        Add hub
                                    </EuiButton>
                                </div>
                            </div>
                        </div>

                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}