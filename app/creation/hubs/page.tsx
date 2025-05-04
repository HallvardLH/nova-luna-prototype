'use client'

import OnboardingSidebar from "@/components/Onboarding/Sidebar/OnboardingSidebar";
import styles from "../page.module.css";
import OnboardingProgress from "@/components/Onboarding/OnboardingProgress/OnboardingProgress";
import HubOverview from "@/components/Entities/Overviews/HubOverview";
import Modals from "@/components/Modals";
import { EuiText } from "@elastic/eui";

export default function HubPage() {
    return (
        <div className={styles.page}>
            <OnboardingSidebar />

            <div className={styles.content}>
                <OnboardingProgress />
                <EuiText style={{ fontSize: "2.5rem" }}>Create your hubs</EuiText>

                <HubOverview />
            </div>
            <Modals />
        </div>
    );
}
