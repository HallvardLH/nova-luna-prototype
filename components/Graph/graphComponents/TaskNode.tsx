'use client';

import { Handle, Position, NodeProps } from 'reactflow';
import style from './Node.module.css';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import { useModalStore } from '@/stores/useModalStore';
import { useGraphStore } from '@/stores/useGraphStore';
import { useEntitiesStore } from '@/stores/useEntitiesStore';

type TaskNodeData = {
    label?: string;
    objects?: string[];
    agents?: string[];
};

export default function TaskNode({ id, data, isConnectable }: NodeProps<TaskNodeData>) {
    const { label = 'Event', objects = [], agents = [] } = data;

    const open = useModalStore((state) => state.open);
    const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);

    const allAgents = useEntitiesStore((state) => state.agents);
    const allObjects = useEntitiesStore((state) => state.objects);

    const agentEntities = agents.map((id) => allAgents.find((a) => a.id === id)).filter(Boolean);
    const objectEntities = objects.map((id) => allObjects.find((o) => o.id === id)).filter(Boolean);

    const handleDoubleClick = () => {
        open('editNode');
        setSelectedNodeId(id);
    };

    return (
        <div
            className={style.node}
            onDoubleClick={handleDoubleClick}
            style={{
                width: '240px',
                height: '240px',
                backgroundColor:  '#ECF1F9',
                border: '10px solid #02ABF1',
            }}
        >
            <div className={style.contents}>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        
                color: "#696969",
                    }}
                >
                    {label}
                </p>
                <br />
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {objectEntities.map((object, index) => (
                        <EntityIcon key={`object-${object?.id ?? index}`} size={32} entity="object" />
                    ))}
                    {agentEntities.map((agent, index) => (
                        <EntityIcon key={`agent-${agent?.id ?? index}`} size={32} entity="agent" />
                    ))}
                </div>
            </div>

            {['Top', 'Bottom', 'Left', 'Right'].flatMap((position) => [
                <Handle
                    key={`${position.toLowerCase()}-target`}
                    type="target"
                    position={Position[position as keyof typeof Position]}
                    id={`${position.toLowerCase()}-target`}
                    isConnectable={isConnectable}
                />,
                <Handle
                    key={`${position.toLowerCase()}-source`}
                    type="source"
                    position={Position[position as keyof typeof Position]}
                    id={`${position.toLowerCase()}-source`}
                    isConnectable={isConnectable}
                />,
            ])}
        </div>
    );
}
