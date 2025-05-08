import React from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getSimpleBezierPath
} from 'reactflow';

const markerEndId = 'custom-arrowhead';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
    sourcePosition,
    targetPosition,
}: EdgeProps) {

    const [edgePath, labelXPos, labelYPos] = getSimpleBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });


    const stroke = data?.stroke ?? '#000';
    const strokeWidth = data?.strokeWidth ?? 2;
    const strokeDasharray = data?.strokeDasharray ?? '';
    const showArrow = data?.arrow === true;

    return (
        <>
            {showArrow && (
                <svg style={{ height: 0, width: 0 }}>
                    <defs>
                        <marker
                            id={markerEndId}
                            markerWidth="6"
                            markerHeight="6"
                            refX="6"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <path d="M 0 0 L 6 3 L 0 6 z" fill={stroke} />
                        </marker>
                    </defs>
                </svg>
            )}

            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={showArrow ? `url(#${markerEndId})` : undefined}
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
