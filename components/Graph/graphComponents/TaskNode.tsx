'use client';

import { Handle, Position, NodeProps } from 'reactflow';
import style from './Node.module.css';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import { EuiButton } from '@elastic/eui';

type TaskNodeData = {
    label?: string;
    objects?: string[];
    agents?: string[];
};

function TaskNode({ data, isConnectable }: NodeProps<TaskNodeData>) {
    const { label = 'Event', objects = [], agents = [] } = data;

    return (
        <div
            className={style.node}
            style={{
                width: '160px',
                height: '160px',
                backgroundColor: '#3b82f6',
                border: '2px solid #1d4ed8',
            }}
        >
            <div className={style.contents}>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '1.4rem',
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
                    {objects.map((_, index) => (
                        <EntityIcon key={`object-${index}`} size={32} entity="object" />
                    ))}
                    {agents.map((_, index) => (
                        <EntityIcon key={`agent-${index}`} size={32} entity="agent" />
                    ))}
                </div>

            </div>

            {/* Handles */}
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

export default TaskNode;
