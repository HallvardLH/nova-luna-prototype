'use client'

import OnboardingSidebar from "@/components/Onboarding/Sidebar/OnboardingSidebar";
import styles from "../page.module.css";
import OnboardingProgress from "@/components/Onboarding/OnboardingProgress/OnboardingProgress";
import EventOverview from "@/components/Entities/Overviews/EventOverview";
import Modals from "@/components/Modals";
import { EuiText } from "@elastic/eui";

export default function EventPage() {
    return (
        <div className={styles.page}>
            <OnboardingSidebar />

            <div className={styles.content}>
                <OnboardingProgress />
                <EuiText style={{ fontSize: "2.5rem" }}>Create your events</EuiText>

                <EventOverview />
            </div>
            <Modals />
        </div>
    );
}
