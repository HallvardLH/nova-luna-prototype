import styles from './OnboardingSidebar.module.css';
import { EuiHorizontalRule, EuiText } from '@elastic/eui';
import Image from 'next/image';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { capitalizeFirstLetter } from '@/app/misc/helpers';
import Link from 'next/link';
import { EntityNames } from '@/app/types/entities';

export default function OnboardingSidebar() {
    const variant = useOnboardingStore((state) => state.variant);

    const currentStep = useOnboardingStore((state) => state.currentStep);
    const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Image
                    src={'/nova-luna-logo.svg'}
                    alt={""}
                    width={50}
                    height={50}
                />
                <EuiText>
                    <p style={{ fontSize: "1.3rem" }}>{capitalizeFirstLetter(variant)} Workshop</p>
                </EuiText>
            </div>
            <EuiHorizontalRule />
            <ol className={styles.linkList}>
                {[
                    'introduction',
                    'agents',
                    'hubs',
                    'objects',
                    'tasks',
                    'events',
                ].map((step) => (
                    <li key={step}>

                        <Link onClick={() => setCurrentStep(step == "introduction" ? step : step.slice(0, -1) as EntityNames | "introduction")}
                            href={`/creation/${step}`}
                            className={`${styles.button} ${currentStep + (currentStep == "introduction" ? "" : "s") === step ? styles.active : ''}`}
                        >
                            {capitalizeFirstLetter(step)}
                        </Link>
                    </li>
                ))}
            </ol>

        </div>
    );
}