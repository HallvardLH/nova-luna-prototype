import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

type TooltipPosition = { x: number; y: number } | null;

type GraphState = {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[] | ((prev: Node[]) => Node[])) => void;
    setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;

    initializeGraph: () => Promise<void>;

    edgeType: 'default' | 'straight' | 'step' | 'smoothstep';
    setEdgeType: (type: GraphState['edgeType']) => void;

    selectedEdgeId: string | null;
    setSelectedEdgeId: (id: string | null) => void;

    tooltipPosition: TooltipPosition;
    setTooltipPosition: (pos: TooltipPosition) => void;
};

const STORAGE_KEY = 'graph-flow-data';

export const useGraphStore = create<GraphState>((set) => ({
    nodes: [],
    edges: [],
    setNodes: (nodes) =>
        set((state) => ({
            nodes: typeof nodes === 'function' ? nodes(state.nodes) : nodes,
        })),
    setEdges: (updater) => {
        set((state) => {
            const newEdges = typeof updater === 'function' ? updater(state.edges) : updater;
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes: state.nodes, edges: newEdges }));
            return { edges: newEdges };
        });
    },

    initializeGraph: async () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const { nodes, edges } = JSON.parse(stored);
            set({ nodes, edges });
        } else {
            const res = await fetch('/graph.json');
            const data = await res.json();
            set({ nodes: data.nodes, edges: data.edges });
        }
    },
    edgeType: 'default',
    setEdgeType: (type) => set({ edgeType: type }),

    selectedEdgeId: null,
    setSelectedEdgeId: (id) => set({ selectedEdgeId: id }),

    tooltipPosition: null,
    setTooltipPosition: (pos) => set({ tooltipPosition: pos }),
}));
