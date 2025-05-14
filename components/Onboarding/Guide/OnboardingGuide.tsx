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

                        <EuiFlexGroup style={{ justifyContent: "space-around", marginTop: "2rem", marginBottom: "5rem" }}>
                            {entities.map((entity) => (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={entity}>
                                    <EuiText className={styles[entity + "Color"]} style={{ textAlign: "center", fontSize: "1.5rem" }}>
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

                            <div className={styles.guideSection}>
                                <EuiText className={styles.guideTitle}>
                                    <h2>Edit or remove</h2>
                                </EuiText>
                                <EuiText className={styles.guideText}>
                                    If you want to edit or remove building blocks, simply hover over the one you want to edit or remove, and press the icons. A pop-up with instructions will then appear.
                                </EuiText>
                                <div style={{ display: "flex", marginTop: "1rem", gap: "1rem", justifyContent: "center" }}>
                                    <EuiIcon type="cross" style={{ fill: "#1D2A3E" }} />
                                    <EuiIcon type="documentEdit" style={{ fill: "#1D2A3E" }} />
                                </div>
                            </div>

                            <div className={styles.guideSection}>
                                <EuiText className={styles.guideTitle}>
                                    <h2>Specification</h2>
                                </EuiText>
                                <EuiText className={styles.guideText}>
                                    Some building blocks need more specification than others.You need to clearly specify which category an object is, and the order of the quests.
                                </EuiText>
                                <div style={{ display: "flex", marginTop: "1rem", justifyContent: "center", gap: "1rem" }}>
                                    <Image
                                        src="/images/quest-illustration.webp"
                                        alt=""
                                        width={220}
                                        height={25}
                                    />
                                </div>
                            </div>
                        </div>

                    </EuiModalBody>
                </EuiModal>
            )}
        </div>
    );
}