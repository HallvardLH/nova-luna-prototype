'use client';

import OnboardingSidebar from "@/components/Onboarding/Sidebar/OnboardingSidebar";
import styles from "../page.module.css";
import OnboardingProgress from "@/components/Onboarding/OnboardingProgress/OnboardingProgress";
import ObjectOverview from "@/components/Entities/Overviews/ObjectOverview";
import Modals from "@/components/Modals";
import { EuiText } from "@elastic/eui";

export default function ObjectsPage() {
    return (
        <div className={styles.page}>
            <OnboardingSidebar />

            <div className={styles.content}>
                <OnboardingProgress />
                <EuiText style={{ fontSize: "2.5rem" }}>Create your objects</EuiText>

                <ObjectOverview />
            </div>
            <Modals />
        </div>
    );
}
