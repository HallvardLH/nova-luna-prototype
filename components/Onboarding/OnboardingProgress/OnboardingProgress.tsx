'use client';

import EntityIcon from "@/components/Sidebar/buildingBlocks/EntityIcon";
import { EuiText, EuiFlexGroup, EuiFlexItem, EuiButton, EuiIcon } from "@elastic/eui";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import Link from "next/link";
import styles from "./OnboardingProgress.module.css";

const entities: Array<"agent" | "hub" | "task" | "event" | "object"> = [
    "agent",
    "hub",
    "object",
    "task",
    "event",
];

export default function OnboardingProgress() {
    const currentStep = useOnboardingStore((state) => state.currentStep);
    const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

    return (
        <>
        <div style={{
            position: 'absolute',
            right: '150px',
        }}>
            <Link href={"/"}>
            <EuiButton iconType={() => <EuiIcon type="check" />} style={{
                backgroundColor: 'white',
            }}>
                Finish workshop
                </EuiButton>
                </Link>
        </div>
        <EuiFlexGroup style={{ flexGrow: 0 }}>
            {entities.map((entity) => (
                <EuiFlexItem key={entity} grow={false}>
                    <Link onClick={() => setCurrentStep(entity)} href={`/creation/${entity}s`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={`${styles.icon} ${entity !== currentStep ? styles.unselectedIcon : ""}`} style={{
                            scale: entity === currentStep ? "1.3" : "1",
                            textAlign: 'center'
                        }}>
                            <EuiText>{entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}</EuiText>
                            <EntityIcon entity={entity} size={100} />
                        </div>
                    </Link>
                </EuiFlexItem>
            ))}
        </EuiFlexGroup>
        </>
    );
}
