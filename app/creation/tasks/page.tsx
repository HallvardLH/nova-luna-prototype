'use client'

import OnboardingSidebar from "@/components/Onboarding/Sidebar/OnboardingSidebar";
import styles from "../page.module.css";
import OnboardingProgress from "@/components/Onboarding/OnboardingProgress/OnboardingProgress";
import TaskOverview from "@/components/Entities/Overviews/TaskOverview";
import Modals from "@/components/Modals";
import { EuiText } from "@elastic/eui";

export default function TaskPage() {
    return (
        <div className={styles.page}>
            <OnboardingSidebar />

            <div className={styles.content}>
                <OnboardingProgress />
                <EuiText style={{ fontSize: "2.5rem" }}>Create your tasks</EuiText>

                <TaskOverview />
            </div>
            <Modals />
        </div>
    );
}
