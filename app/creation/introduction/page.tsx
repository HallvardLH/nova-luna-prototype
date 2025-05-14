'use client'

import OnboardingSidebar from "@/components/Onboarding/Sidebar/OnboardingSidebar";
import styles from "../page.module.css";
import OnboardingProgress from "@/components/Onboarding/OnboardingProgress/OnboardingProgress";
import Modals from "@/components/Modals";
import { EuiText, EuiButton, EuiIcon, EuiFlexGroup } from "@elastic/eui";
import { useModalStore } from "@/stores/useModalStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import Link from "next/link";

export default function IntroductionPage() {
    const open = useModalStore((state) => state.open);
    const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

    return (
        <div className={styles.page}>
            <OnboardingSidebar />

            <div className={styles.content}>
                <OnboardingProgress />
                <EuiText style={{ fontSize: "2.5rem" }}>Introduction</EuiText>
                <EuiText style={{ fontSize: "1.5rem" }}>Welcome to game creation by NOVA LUNA STUDIO.</EuiText>
                <EuiText style={{ textAlign: "center" }}>
                    In game creation you&apos;ll make all the building blocks for your game, together.
                    <br />
                    This is also where you will go deeper into the specifications of each building block.
                </EuiText>

                <EuiFlexGroup>
                    <EuiButton
                        onClick={() => open("onboardingGuide")}
                        iconType={() => <EuiIcon type="documentation" style={{ fill: '#B1A452' }} />}
                        style={{
                            backgroundColor: 'white',
                            border: '2px solid #B1A452',
                            color: '#B1A452',
                        }}
                    >
                        Guide
                    </EuiButton>
                    <Link onClick={() => setCurrentStep("agent")} href={"/creation/agents"}>
                        <EuiButton
                            iconType={() => <EuiIcon type="arrowRight" style={{ fill: '#6034FF' }} />}
                            style={{
                                backgroundColor: 'white',
                                border: '2px solid #6034FF',
                                color: '#6034FF',
                            }}
                        >
                            Get started
                        </EuiButton>
                    </Link>
                </EuiFlexGroup>
            </div>
            <Modals />
        </div>
    );
}