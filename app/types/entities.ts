export type EntityNames = "agent" | "hub" | "task" | "event" | "object";

export type Agent = {
    id: string;
    name: string;
    description: string;
    appearances: string[]; // Event IDs
};

export type Event = {
    id: string;
    name: string;
    description: string;
    occupants: string[]; // Agent and object IDs
};

export type Object = {
    id: string;
    name: string;
    description: string;
    appearances: string[]; // Event IDs
};

export type Task = {
    id: string;
    name: string;
    description: string;
};

export type Hub = {
    id: string;
    name: string;
    description: string;
};

export type EntityMap = {
    agents: Agent[];
    events: Event[];
    objects: Object[];
    tasks: Task[];
    hubs: Hub[];
};