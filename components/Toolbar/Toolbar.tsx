// 'use client';

import React from 'react';
import {
    EuiPanel,
    EuiFormRow,
    // EuiColorPicker,
    EuiRange,
    EuiSelect,
} from '@elastic/eui';
import { useGraphStore } from '@/stores/useGraphStore';

// Dynamic importing for the EuiColorPicker to avoid SSR issues
import dynamic from "next/dynamic";
const ColorPicker = dynamic(() => import("./ColorPickerWrapper"), {
    ssr: false,
});


export default function Toolbar() {
    const edgeStyle = useGraphStore((state) => state.edgeStyle);
    const setEdgeStyle = useGraphStore((state) => state.setEdgeStyle);

    const handleColorChange = (color: string) => {
        setEdgeStyle({ ...edgeStyle, stroke: color });
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEdgeStyle({ ...edgeStyle, strokeWidth: parseInt(e.target.value, 10) });
    };

    const handleDashChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEdgeStyle({ ...edgeStyle, strokeDasharray: e.target.value });
    };

    return (
        <EuiPanel
            paddingSize="m"
            style={{ width: 240, position: 'absolute', bottom: 10, left: "50%", zIndex: 10 }}
        >
            <EuiFormRow label="Edge Color">

                <ColorPicker
                    color={edgeStyle.stroke}
                    onChange={handleColorChange}
                // fullWidth
                />
            </EuiFormRow>

            <EuiFormRow label="Edge Thickness">
                <EuiRange
                    min={1}
                    max={10}
                    value={edgeStyle.strokeWidth}
                    // @ts-expect-error // The Eui component does not want this kind of function,
                    // but it works just fine
                    onChange={handleWidthChange}
                    showValue
                    fullWidth
                />
            </EuiFormRow>

            <EuiFormRow label="Stroke Style">
                <EuiSelect
                    options={[
                        { value: '', text: 'Solid' },
                        { value: '5,5', text: 'Dotted' },
                        { value: '10,5', text: 'Dashed' },
                        { value: '10,5,2,5', text: 'Dash-Dot' },
                    ]}
                    value={edgeStyle.strokeDasharray}
                    onChange={handleDashChange}
                />
            </EuiFormRow>
        </EuiPanel>
    );
}
