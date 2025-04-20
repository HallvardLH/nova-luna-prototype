// stores/useDragStore.ts
import { create } from 'zustand';
import { EntityNames } from '@/app/types/entities';

type DraggedEntity = {
    type: EntityNames;
    name: string;
} | null;

interface DragStore {
    draggedEntity: DraggedEntity;
    setDraggedEntity: (entity: DraggedEntity) => void;
    clearDraggedEntity: () => void;
}

export const useDragStore = create<DragStore>((set) => ({
    draggedEntity: null,
    setDraggedEntity: (entity) => set({ draggedEntity: entity }),
    clearDraggedEntity: () => set({ draggedEntity: null }),
}));
