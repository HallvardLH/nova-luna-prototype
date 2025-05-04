'use client'

import OnboardingSidebar from "@/components/Onboarding/Sidebar/OnboardingSidebar";
import styles from "../page.module.css";
import OnboardingProgress from "@/components/Onboarding/OnboardingProgress/OnboardingProgress";
import AgentOverview from "@/components/Entities/Overviews/AgentOverview";
import Modals from "@/components/Modals";
import { EuiText } from "@elastic/eui";

export default function AgentsPage() {
    return (
        <div className={styles.page}>
            <OnboardingSidebar />

            <div className={styles.content}>
                <OnboardingProgress />
                <EuiText style={{ fontSize: "2.5rem" }}>Create your agents</EuiText>

                <AgentOverview />
            </div>
            <Modals />
        </div>
    );
}