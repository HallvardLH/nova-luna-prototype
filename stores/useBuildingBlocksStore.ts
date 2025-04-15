import { create } from 'zustand';

// =========================
// Type Definitions
// =========================
type AgentType = {
    id: string;
    name: string;
    description: string;
    appearances: string[]; // Event IDs
};

type EventType = {
    id: string;
    name: string;
    description: string;
    occupants: string[]; // Agent and object IDs
};

type ObjectType = {
    id: string;
    name: string;
    description: string;
    appearances: string[]; // Event IDs
};

type TaskType = {
    id: string;
    name: string;
    description: string;
};

type HubType = {
    id: string;
    name: string;
    description: string;
};

// =========================
// Store Interface
// =========================
interface BuildingBlocksState {
    // State Collections
    agents: AgentType[];
    questEvents: EventType[];
    objects: ObjectType[];
    tasks: TaskType[];
    hubs: HubType[];

    // Agent CRUD
    addAgent: (agent: AgentType) => void;
    updateAgent: (id: string, updates: Partial<Omit<AgentType, 'id'>>) => void;
    deleteAgent: (id: string) => void;
    getAgent: (id: string) => AgentType | undefined;

    // Quest Event CRUD
    addQuestEvent: (event: EventType) => void;
    updateQuestEvent: (id: string, updates: Partial<Omit<EventType, 'id'>>) => void;
    deleteQuestEvent: (id: string) => void;
    getQuestEvent: (id: string) => EventType | undefined;

    // Object CRUD
    addObject: (object: ObjectType) => void;
    updateObject: (id: string, updates: Partial<Omit<ObjectType, 'id'>>) => void;
    deleteObject: (id: string) => void;
    getObject: (id: string) => ObjectType | undefined;

    // Task CRUD
    addTask: (task: TaskType) => void;
    updateTask: (id: string, updates: Partial<Omit<TaskType, 'id'>>) => void;
    deleteTask: (id: string) => void;
    getTask: (id: string) => TaskType | undefined;

    // Hub CRUD
    addHub: (hub: HubType) => void;
    updateHub: (id: string, updates: Partial<Omit<HubType, 'id'>>) => void;
    deleteHub: (id: string) => void;
    getHub: (id: string) => HubType | undefined;
}

// =========================
// Store Implementation
// =========================
export const useBuildingBlocksStore = create<BuildingBlocksState>((set, get) => ({
    agents: [],
    questEvents: [],
    objects: [],
    tasks: [],
    hubs: [],

    // Agent Functions
    addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
    updateAgent: (id, updates) => set((state) => ({
        agents: state.agents.map(agent => agent.id === id ? { ...agent, ...updates } : agent)
    })),
    deleteAgent: (id) => set((state) => ({ agents: state.agents.filter(agent => agent.id !== id) })),
    getAgent: (id) => get().agents.find(agent => agent.id === id),

    // Quest Event Functions
    addQuestEvent: (event) => set((state) => ({ questEvents: [...state.questEvents, event] })),
    updateQuestEvent: (id, updates) => set((state) => ({
        questEvents: state.questEvents.map(event => event.id === id ? { ...event, ...updates } : event)
    })),
    deleteQuestEvent: (id) => set((state) => ({ questEvents: state.questEvents.filter(event => event.id !== id) })),
    getQuestEvent: (id) => get().questEvents.find(event => event.id === id),

    // Object Functions
    addObject: (object) => set((state) => ({ objects: [...state.objects, object] })),
    updateObject: (id, updates) => set((state) => ({
        objects: state.objects.map(obj => obj.id === id ? { ...obj, ...updates } : obj)
    })),
    deleteObject: (id) => set((state) => ({ objects: state.objects.filter(obj => obj.id !== id) })),
    getObject: (id) => get().objects.find(obj => obj.id === id),

    // Task Functions
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
    })),
    deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== id) })),
    getTask: (id) => get().tasks.find(task => task.id === id),

    // Hub Functions
    addHub: (hub) => set((state) => ({ hubs: [...state.hubs, hub] })),
    updateHub: (id, updates) => set((state) => ({
        hubs: state.hubs.map(hub => hub.id === id ? { ...hub, ...updates } : hub)
    })),
    deleteHub: (id) => set((state) => ({ hubs: state.hubs.filter(hub => hub.id !== id) })),
    getHub: (id) => get().hubs.find(hub => hub.id === id),
}));