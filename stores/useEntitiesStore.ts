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

// Represents the overall shape of the store state for managing various entities
export interface EntitiesState extends EntityMap {
    // Grouped utility actions to interact with entities in a generic and reusable way
    actions: {
        /**
         * Adds a new item to a specific entity collection (e.g., 'agents', 'tasks', etc.).
         * @param key - The key of the entity collection to add to (e.g., 'agents').
         * @param item - The item to be added to the collection.
         */
        add: <K extends keyof EntityMap>(
            key: K,
            item: EntityMap[K][number]
        ) => void;

        /**
         * Updates an existing item in a specific entity collection by ID.
         * @param key - The key of the entity collection to update (e.g., 'tasks').
         * @param id - The ID of the item to update.
         * @param updates - A partial object containing the properties to update.
         */
        update: <K extends keyof EntityMap>(
            key: K,
            id: string,
            updates: Partial<Omit<EntityMap[K][number], 'id'>>
        ) => void;

        /**
         * Deletes an item from a specific entity collection by ID.
         * @param key - The key of the entity collection to delete from (e.g., 'objects').
         * @param id - The ID of the item to delete.
         */
        delete: <K extends keyof EntityMap>(
            key: K,
            id: string
        ) => void;

        /**
         * Retrieves an item from a specific entity collection by ID.
         * @param key - The key of the entity collection to retrieve from (e.g., 'hubs').
         * @param id - The ID of the item to retrieve.
         * @returns The found item, or undefined if not found.
         */
        get: <K extends keyof EntityMap>(
            key: K,
            id: string
        ) => EntityMap[K][number] | undefined;
    };
}

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
        }
    )
);
