import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EntityNames } from '@/app/types/entities';

export type onBoardingVariant = "pen and paper" | "digital";

interface OnboardingState {
    onboarding: boolean;
    setOnboarding: (onboarding: boolean) => void;
    variant: onBoardingVariant;
    setVariant: (variant: onBoardingVariant) => void;
    currentStep: EntityNames;
    setCurrentStep: (entity: EntityNames) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            onboarding: true,
            setOnboarding: (onboarding: boolean) => set({ onboarding }),
            variant: "pen and paper",
            setVariant: (variant: onBoardingVariant) => set({ variant }),
            currentStep: "agent",
            setCurrentStep: (entity: EntityNames) => set({ currentStep: entity }),
        }),
        {
            name: 'onboarding-storage',
        }
    )
);
