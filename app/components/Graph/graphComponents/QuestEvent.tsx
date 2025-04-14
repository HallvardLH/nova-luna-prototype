'use client';

// import { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import style from './Node.module.css';

type HubNodeData = {
    label?: string;
};

function QuestEventNode({ data, isConnectable }: NodeProps<HubNodeData>) {
    // const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(evt.target.value);
    // }, []);

    return (
        <div className={style.node} style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#3b82f6',
            border: '2px solid #1d4ed8',
        }}>
            <p style={{
                textAlign: "center"
            }}>
                {data?.label || 'Event'}
            </p>
            <Handle
                type="target"
                position={Position.Top}
                id="top-target"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Top}
                id="top-source"
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Bottom}
                id="bottom-target"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom-source"
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Right}
                id="right-target"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right-source"
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="left-target"
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="left-source"
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default QuestEventNode;