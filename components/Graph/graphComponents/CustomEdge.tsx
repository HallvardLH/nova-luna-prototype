import React from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    EdgeProps,
} from 'reactflow';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
    // labelX,
    // labelY,
}: EdgeProps) {
    const [edgePath, labelXPos, labelYPos] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const stroke = data?.stroke ?? '#000';
    const strokeWidth = data?.strokeWidth ?? 2;
    const strokeDasharray = data?.strokeDasharray ?? '';

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke,
                    strokeWidth,
                    strokeDasharray,
                }}
            />
            {data?.label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%)`,
                            left: labelXPos,
                            top: labelYPos,
                            background: 'white',
                            padding: 2,
                            border: '1px solid #ccc',
                            fontSize: 10,
                            pointerEvents: 'all',
                        }}
                    >
                        {data.label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}
