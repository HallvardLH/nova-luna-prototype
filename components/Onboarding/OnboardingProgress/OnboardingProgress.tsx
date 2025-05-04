'use client';

import EntityIcon from "@/components/Sidebar/buildingBlocks/EntityIcon";
import { EuiText, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import Link from "next/link";

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
        <EuiFlexGroup style={{ flexGrow: 0 }}>
            {entities.map((entity) => (
                <EuiFlexItem key={entity} grow={false}>
                    <Link onClick={() => setCurrentStep(entity)} href={`/creation/${entity}s`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ filter: entity === currentStep ? "none" : "grayscale(100%)", textAlign: 'center' }}>
                            <EntityIcon entity={entity} size={100} />
                            <EuiText>{entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}</EuiText>
                        </div>
                    </Link>
                </EuiFlexItem>
            ))}
        </EuiFlexGroup>
    );
}
