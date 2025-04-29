import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Agent, Event, Object, Task, Hub } from '@/app/types/entities';

type EntityMap = {
    agents: Agent[];
    events: Event[];
    objects: Object[];
    tasks: Task[];
    hubs: Hub[];
};

export interface EntitiesState extends EntityMap {
    actions: {
        add: <K extends keyof EntityMap>(key: K, item: EntityMap[K][number]) => void;
        update: <K extends keyof EntityMap>(
            key: K,
            id: string,
            updates: Partial<Omit<EntityMap[K][number], 'id'>>
        ) => void;
        delete: <K extends keyof EntityMap>(key: K, id: string) => void;
        get: <K extends keyof EntityMap>(key: K, id: string) => EntityMap[K][number] | undefined;
    };
}


// Create store with only data persisted
export const useEntitiesStore = create<EntitiesState>()(
    persist(
        (set, get) => ({
            agents: [],
            events: [],
            objects: [],
            tasks: [],
            hubs: [],
            actions: {
                add: (key, item) =>
                    set((state) => ({
                        [key]: [...state[key], item],
                    })),
                update: (key, id, updates) =>
                    set((state) => ({
                        [key]: state[key].map((entry) =>
                            entry.id === id ? { ...entry, ...updates } : entry
                        ),
                    })),
                delete: (key, id) =>
                    set((state) => ({
                        [key]: state[key].filter((entry) => entry.id !== id),
                    })),
                get: (key, id) => {
                    return get()[key].find((entry) => entry.id === id);
                },
            },
        }),
        {
            name: 'entities-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                agents: state.agents,
                events: state.events,
                objects: state.objects,
                tasks: state.tasks,
                hubs: state.hubs,
            }),
        }
    )
);

// Define and set actions after store creation
const actions: EntitiesState['actions'] = {
    add: (key, item) =>
        useEntitiesStore.setState((state) => ({
            [key]: [...state[key], item],
        })),

    update: (key, id, updates) =>
        useEntitiesStore.setState((state) => ({
            [key]: state[key].map((entry) =>
                entry.id === id ? { ...entry, ...updates } : entry
            ),
        })),

    delete: (key, id) =>
        useEntitiesStore.setState((state) => ({
            [key]: state[key].filter((entry) => entry.id !== id),
        })),

    get: (key, id) => {
        return useEntitiesStore.getState()[key].find((entry) => entry.id === id);
    },
};

// Set the actions in the store
useEntitiesStore.setState({ actions });