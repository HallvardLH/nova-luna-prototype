'use client';

import { Handle, Position, NodeProps } from 'reactflow';
import style from './Node.module.css';

type HubNodeData = {
    label?: string;
};

function HubNode({ data, isConnectable }: NodeProps<HubNodeData>) {
    // const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(evt.target.value);
    // }, []);

    return (
        <div className={style.node} style={{
            width: '320px',
            height: '320px',
            backgroundColor: '#02AE4F',
            border: '2px solid #1d4ed8',
        }}>
            <p style={{
                textAlign: "center",
                fontSize: "1.4rem"
            }}>
                {data?.label || 'Hub'}
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

export default HubNode;