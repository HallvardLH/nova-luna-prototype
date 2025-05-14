'use client';

import EntityIcon from "@/components/Sidebar/buildingBlocks/EntityIcon";
import { EuiText, EuiFlexGroup, EuiFlexItem, EuiButton, EuiIcon } from "@elastic/eui";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import Link from "next/link";
import styles from "./OnboardingProgress.module.css";
import Image from "next/image";
import { EntityNames } from "@/app/types/entities";
import { useRouter } from "next/navigation";

const steps: Array<"introduction" | "agent" | "hub" | "object" | "task" | "event"> = [
    "introduction",
    "agent",
    "hub",
    "object",
    "task",
    "event",
];

export default function OnboardingProgress() {
    const router = useRouter();
    const currentStep = useOnboardingStore((state) => state.currentStep);
    const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

    const currentIndex = steps.indexOf(currentStep);

    const navigateTo = (step: (typeof steps)[number]) => {
        setCurrentStep(step);
        if (step !== "introduction") {
            router.push(`/creation/${step}s`);
        } else {
            router.push(`/creation/introduction`);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            navigateTo(steps[currentIndex - 1]);
        }
    };

    const goToNext = () => {
        if (currentIndex < steps.length - 1) {
            navigateTo(steps[currentIndex + 1]);
        }
    };

    return (
        <EuiFlexGroup style={{ flexGrow: 0 }} alignItems="center">
            <EuiFlexItem grow={false}>
                <div onClick={goToPrevious} style={{ cursor: 'pointer' }}>
                    <Image
                        src="/images/arrow-left.webp"
                        alt="Previous"
                        width={70}
                        height={175}
                        className={styles.arrow}
                    />
                </div>
            </EuiFlexItem>

            {steps.slice(1).map((entity) => (
                <EuiFlexItem key={entity} grow={false}>
                    <Link
                        onClick={() => navigateTo(entity)}
                        href={`/creation/${entity}s`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div
                            className={`${styles.icon} ${entity !== currentStep ? styles.unselectedIcon : ""
                                }`}
                            style={{
                                scale: entity === currentStep ? "1.3" : "1",
                                textAlign: 'center',
                            }}
                        >
                            <EuiText>
                                {entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}
                            </EuiText>
                            <EntityIcon entity={entity as EntityNames} size={100} />
                        </div>
                    </Link>
                </EuiFlexItem>
            ))}

            <EuiFlexItem grow={false}>
                <div onClick={goToNext} style={{ cursor: 'pointer' }}>
                    <Image
                        src="/images/arrow-right.webp"
                        alt="Next"
                        width={70}
                        height={175}
                        className={styles.arrow}
                    />
                </div>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}
