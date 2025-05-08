'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Edge,
    // Node,
    useReactFlow,
    BackgroundVariant,
    NodeChange,
    EdgeChange,
    OnSelectionChangeParams
} from 'reactflow';
import 'reactflow/dist/style.css';
import HubNode from './graphComponents/HubNode';
import TaskNode from './graphComponents/TaskNode';
import CustomEdge from './graphComponents/CustomEdge';
import DeleteEdgeTooltip from './tooltips/DeleteEdgeTooltip';
import { useGraphStore } from '@/stores/useGraphStore';
import { useDragStore } from '@/stores/useDragStore';

const nodeTypes = { hub: HubNode, task: TaskNode };
const edgeTypes = { custom: CustomEdge };

export default function GraphFlowEditor() {
    const nodes = useGraphStore((state) => state.nodes);
    const setNodes = useGraphStore((state) => state.setNodes);

    const edges = useGraphStore((state) => state.edges);
    const setEdges = useGraphStore((state) => state.setEdges);

    const initializeGraph = useGraphStore((state) => state.initializeGraph);
    const edgeType = useGraphStore((state) => state.edgeType);
    const edgeStyle = useGraphStore((state) => state.edgeStyle);

    const selectedEdgeId = useGraphStore((state) => state.selectedEdgeId);
    const setSelectedEdgeId = useGraphStore((state) => state.setSelectedEdgeId);

    const tooltipPosition = useGraphStore((state) => state.tooltipPosition);
    const setTooltipPosition = useGraphStore((state) => state.setTooltipPosition);

    const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
    const project = useReactFlow().project;

    useEffect(() => {
        initializeGraph();
    }, [initializeGraph]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback(
        (connection: Edge | Connection) =>
            setEdges((eds) =>
                addEdge(
                    {
                        ...connection,
                        type: 'custom',
                        data: edgeStyle,
                    },
                    eds
                )
            ),
        [edgeStyle, setEdges]
    );

    const onNodeClick = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            setTooltipPosition({ x: event.clientX, y: event.clientY });
        },
        [setTooltipPosition]
    );


    const onEdgeClick = useCallback(
        (event: React.MouseEvent, edge: Edge) => {
            event.stopPropagation();
            setSelectedEdgeId(edge.id);
            setTooltipPosition({ x: event.clientX, y: event.clientY });
        },
        [setSelectedEdgeId, setTooltipPosition]
    );

    const deleteSelectedEdge = useCallback(() => {
        if (selectedEdgeId) {
            setEdges((eds) => eds.filter((e) => e.id !== selectedEdgeId));
            setSelectedEdgeId(null);
            setTooltipPosition(null);
        }
    }, [selectedEdgeId, setSelectedEdgeId, setTooltipPosition, setEdges]);

    const deleteSelectedNodes = useCallback(() => {
        if (selectedNodeIds.length > 0) {
            setNodes((nds) => nds.filter((node) => !selectedNodeIds.includes(node.id)));
            setEdges((eds) =>
                eds.filter((edge) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target))
            );
            setSelectedNodeIds([]);
        }
    }, [selectedNodeIds, setNodes, setEdges]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Backspace' || event.key === 'Delete') {
                deleteSelectedEdge();
                deleteSelectedNodes();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteSelectedEdge, deleteSelectedNodes]);

    useEffect(() => {
        const handleClickOutside = () => {
            setSelectedEdgeId(null);
            setTooltipPosition(null);
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [setSelectedEdgeId, setTooltipPosition]);

    const handleDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const reactFlowBounds = event.currentTarget.getBoundingClientRect();

            const position = project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const dragged = useDragStore.getState().draggedEntity;
            if (!dragged) return;

            const newNode = {
                id: `${dragged.type}-${Date.now()}`,
                type: dragged.type,
                position,
                data: { label: dragged.name },
            };

            setNodes((nds) => [...nds, newNode]);
            useDragStore.getState().clearDraggedEntity();
        },
        [setNodes, project]
    );

    const onSelectionChange = useCallback(
        ({ nodes }: OnSelectionChangeParams) => {
            setSelectedNodeIds(nodes?.map((n) => n.id) || []);
        },
        []
    );

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onEdgeClick={onEdgeClick}
                onNodeClick={onNodeClick}
                onSelectionChange={onSelectionChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{ type: edgeType }}
                fitView
                deleteKeyCode={['Backspace', 'Delete']}
                snapToGrid={true}
                snapGrid={[40, 40]}
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                minZoom={0.1}
            >
                <Controls />
                <Background
                    variant={BackgroundVariant.Cross}
                    gap={80}
                    style={{ backgroundColor: '#ECF1F9' }}
                    color="#b4b2b2"
                />
            </ReactFlow>

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