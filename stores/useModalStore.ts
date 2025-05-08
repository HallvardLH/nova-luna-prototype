/**
 * A Zustand store for managing the state of modals in the application.
 * Provides methods to open, close, toggle, and check the state of specific modals,
 * as well as a method to close all modals at once.
 *
 * @module useModalStore
 */

import { create } from 'zustand';

export type ModalName = 'agentOverview' | 'eventOverview' | 'hubOverview' | 'objectOverview' | 'taskOverview' | "addHub" | "addAgent" | "addEvent" | "addObject" | "addTask" | 'editNode' | 'onboardingGuide';

type ModalStore = {
    /**
     * An object representing the state of all modals.
     * Each key corresponds to a modal name, and the value is a boolean indicating whether the modal is open.
     */
    modals: Record<ModalName, boolean>;

    /**
     * Opens a specific modal by setting its state to true.
     *
     * @param modal - The name of the modal to open.
     */
    open: (modal: ModalName) => void;

    /**
     * Closes a specific modal by setting its state to false.
     *
     * @param modal - The name of the modal to close.
     */
    close: (modal: ModalName) => void;

    /**
     * Toggles the state of a specific modal.
     * If the modal is open, it will be closed, and vice versa.
     *
     * @param modal - The name of the modal to toggle.
     */
    toggle: (modal: ModalName) => void;

    /**
     * Closes all modals by setting their states to false.
     */
    closeAll: () => void;

    /**
     * Checks if a specific modal is currently open.
     *
     * @param modal - The name of the modal to check.
     * @returns true if the modal is open, otherwise false.
     */
    isOpen: (modal: ModalName) => boolean;
};

export const useModalStore = create<ModalStore>((set, get) => ({
    modals: {
        agentOverview: false,
        eventOverview: false,
        hubOverview: false,
        objectOverview: false,
        taskOverview: false,

        addHub: false,
        addAgent: false,
        addEvent: false,
        addObject: false,
        addTask: false,

        editNode: false,

        onboardingGuide: false,

    },
    open: (modal) => set((state) => ({ modals: { ...state.modals, [modal]: true } })),
    close: (modal) => set((state) => ({ modals: { ...state.modals, [modal]: false } })),
    toggle: (modal) => set((state) => ({
        modals: { ...state.modals, [modal]: !state.modals[modal] }
    })),
    closeAll: () =>
        set((state) => ({
            modals: Object.fromEntries(Object.keys(state.modals).map((key) => [key, false])) as Record<ModalName, boolean>,
        })),
    isOpen: (modal) => get().modals[modal],
}));
