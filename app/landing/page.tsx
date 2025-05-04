'use client';
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { EuiText, EuiFlexGroup, EuiTitle } from "@elastic/eui";
import { useRouter } from "next/navigation";
import { useOnboardingStore, onBoardingVariant } from "@/stores/useOnboardingStore";
export default function LandingPage() {
    const router = useRouter();

    const setVariant = useOnboardingStore((state) => state.setVariant);
    const startOnboarding = (varant: onBoardingVariant) => {
        setVariant(varant);
        router.push("/creation/agents");
    };

    return (
        <div className={styles.container}>
            <Image
                priority
                src={'/nova-luna-logo.svg'}
                alt={""}
                width={200}
                height={200}
            />
            <EuiTitle><EuiText>Welcome to Nova Luna</EuiText></EuiTitle>
            <EuiFlexGroup gutterSize="xl">
                <button className={styles.bigButton} onClick={() => startOnboarding("pen and paper")}>
                    <EuiText style={{ fontSize: "30px" }}>Pen and paper</EuiText>
                    <EuiText>Do the co-design phase of eLuna with teamates in the same room, following instructions on the screen.</EuiText>
                </button>
                <button className={styles.bigButton} onClick={() => startOnboarding("digital")}>
                    <EuiText style={{ fontSize: "30px" }}>Digital</EuiText>
                    <EuiText>Do the co-desing phase of eLuna digitally with your teammates.</EuiText>
                </button>
            </EuiFlexGroup>
        </div>
    );
}