'use client';

import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    Node,
    // useReactFlow,
    Panel,
    BackgroundVariant,
    NodeChange,
    EdgeChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import HubNode from './graphComponents/hub';
import QuestEventNode from './graphComponents/QuestEvent';
import DeleteEdgeTooltip from './tooltips/DeleteEdgeTooltip';

// Key used for local storage of graph
const STORAGE_KEY = 'graph-flow-data';

// We define node types here to avoid having to memoize in the component
const nodeTypes = { hub: HubNode, event: QuestEventNode };


/**
 * GraphFlowEditor renders an interactive node-based editor using React Flow. It supports:
 * - Custom node types (Hub and QuestEvent)
 * - Creating, editing, deleting edges and nodes
 * - Selecting edge type (curved, straight, stepped, etc.)
 * - Persisting graph data to localStorage
 * - Loading initial data from a static JSON file if localStorage is empty
 * - Tooltip to delete selected edges
 */
export default function GraphFlowEditor() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    // const { fitView } = useReactFlow();
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
    const [edgeType, setEdgeType] = useState<'default' | 'straight' | 'step' | 'smoothstep'>('default');

    /**
    * Loads graph data from localStorage or falls back to the static /graph.json file.
    */
    useEffect(() => {
        const loadData = async () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const { nodes, edges } = JSON.parse(stored);
                setNodes(nodes);
                setEdges(edges);
            } else {
                const res = await fetch('/graph.json');
                const data = await res.json();
                setNodes(data.nodes);
                setEdges(data.edges);
            }
        };
        loadData();
    }, []);

    /**
    * Persists the current graph state to localStorage on every node or edge update.
    */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
    }, [nodes, edges]);

    /**
    * Handles changes to nodes (e.g. dragging, updating labels).
    */
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    /**
    * Handles changes to edges (e.g. repositioning).
    */
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    /**
    * Handles creating a new connection between nodes with the selected edge type.
    * Edge type is selected by the user.
    * TODO: add proper UI for selecting edge type
    * TODO: let user change type of existing edge
    */
    const onConnect = useCallback(
        (connection: Edge | Connection) => setEdges((eds) => addEdge({
            ...connection,
            type: edgeType,
        }, eds)),
        [edgeType]
    );

    /**
    * Handles selecting an edge by clicking on it.
    * Shows a tooltip with delete option near the cursor.
    */
    const onEdgeClick = useCallback(
        (event: React.MouseEvent, edge: Edge) => {
            event.stopPropagation();
            setSelectedEdgeId(edge.id);
            setTooltipPosition({ x: event.clientX, y: event.clientY });
        },
        []
    );

    /**
    * Deletes the currently selected edge from the graph.
    */
    const deleteSelectedEdge = useCallback(() => {
        if (selectedEdgeId) {
            setEdges((eds) => eds.filter((e) => e.id !== selectedEdgeId));
            setSelectedEdgeId(null);
            setTooltipPosition(null);
        }
    }, [selectedEdgeId]);

    /**
    * Deselects the edge and hides the tooltip if a click occurs outside it.
    */
    useEffect(() => {
        const handleClickOutside = () => {
            setSelectedEdgeId(null);
            setTooltipPosition(null);
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeClick={onEdgeClick}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={{
                    type: edgeType,
                }}
                fitView
                deleteKeyCode={['Backspace', 'Delete']}
                snapToGrid={true}
                snapGrid={[80, 80]}
            >
                <Controls />
                <Background
                    variant={BackgroundVariant.Lines}
                    gap={80}
                />

                {/* Edge type selector UI */}
                {/* Not here to stay */}
                <Panel position="top-left">
                    <div style={{
                        background: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Edge Type:
                        </label>

                        <select
                            value={edgeType}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setEdgeType(e.target.value as 'default' | 'straight' | 'step' | 'smoothstep')
                            }
                        >
                            <option value="default">Curved (Bezier)</option>
                            <option value="straight">Straight</option>
                            <option value="step">Stepped</option>
                            <option value="smoothstep">Smooth Stepped</option>
                        </select>
                    </div>
                </Panel>
            </ReactFlow>

            {/* Tooltip for deleting selected edge */}
            {selectedEdgeId && tooltipPosition && (
                <DeleteEdgeTooltip
                    x={tooltipPosition.x}
                    y={tooltipPosition.y}
                    onDelete={deleteSelectedEdge}
                />
            )}

        </>
    );
}