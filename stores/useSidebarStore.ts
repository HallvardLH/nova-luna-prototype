import { create } from 'zustand';
import { EntityNames } from '@/app/types/entities';

interface SidebarState {
    selectedEntity: EntityNames | "none",
    setSelectedEntity: (entity: EntityNames | "none") => void,
}

export const useSidebarStore = create<SidebarState>((set) => ({
    selectedEntity: "none",
    setSelectedEntity: (entity: EntityNames | "none") => set({ selectedEntity: entity }),
}))
