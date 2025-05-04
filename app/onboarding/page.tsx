'use client'

import styles from "./page.module.css";
import { useModalStore } from "@/stores/useModalStore";
import { useEffect } from "react";
import Modals from "@/components/Modals";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { ModalName } from "@/stores/useModalStore";

export default function OnboardingPage() {
    const open = useModalStore((state) => state.open);
    const currentStep = useOnboardingStore((state) => state.currentStep);

    useEffect(() => {
        open(currentStep + "Overview" as ModalName);
    });

    return (
        <>
            <div className={styles.container}>
            </div>
            <Modals />
        </>
    );
}