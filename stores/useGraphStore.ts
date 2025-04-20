import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Node, Edge } from 'reactflow';

type TooltipPosition = { x: number; y: number } | null;

type EdgeStyle = {
    stroke: string;
    strokeWidth: number;
    strokeDasharray?: string;
};

type GraphState = {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[] | ((prev: Node[]) => Node[])) => void;
    setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;

    initializeGraph: () => Promise<void>;

    edgeType: 'default' | 'straight' | 'step' | 'smoothstep';
    setEdgeType: (type: GraphState['edgeType']) => void;

    edgeStyle: EdgeStyle;
    setEdgeStyle: (style: Partial<EdgeStyle>) => void;

    selectedEdgeId: string | null;
    setSelectedEdgeId: (id: string | null) => void;

    tooltipPosition: TooltipPosition;
    setTooltipPosition: (pos: TooltipPosition) => void;
};

const STORAGE_KEY = 'graph-flow-data';

export const useGraphStore = create<GraphState>()(
    persist(
        (set, get) => ({
            nodes: [],
            edges: [],
            setNodes: (nodes) =>
                set((state) => ({
                    nodes: typeof nodes === 'function' ? nodes(state.nodes) : nodes,
                })),
            setEdges: (updater) =>
                set((state) => ({
                    edges: typeof updater === 'function' ? updater(state.edges) : updater,
                })),
            initializeGraph: async () => {
                const stored = get();
                if (stored.nodes.length && stored.edges.length) return;

                const res = await fetch('/graph.json');
                const data = await res.json();
                set({ nodes: data.nodes, edges: data.edges });
            },
            edgeType: 'default',
            setEdgeType: (type) => set({ edgeType: type }),

            edgeStyle: {
                stroke: '#000000',
                strokeWidth: 2,
                strokeDasharray: '',
            },
            setEdgeStyle: (style) =>
                set((state) => ({
                    edgeStyle: {
                        ...state.edgeStyle,
                        ...style,
                    },
                })),

            selectedEdgeId: null,
            setSelectedEdgeId: (id) => set({ selectedEdgeId: id }),

            tooltipPosition: null,
            setTooltipPosition: (pos) => set({ tooltipPosition: pos }),
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                nodes: state.nodes,
                edges: state.edges,
                edgeType: state.edgeType,
                edgeStyle: state.edgeStyle,
            }),
        }
    )
);
