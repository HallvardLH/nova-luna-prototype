"use client";

import React from "react";
import { EuiColorPicker } from "@elastic/eui";

type Props = {
    color: string;
    onChange: (color: string) => void;
};

// This component is a wrapper around the EuiColorPicker to avoid SSR issues

const ColorPickerWrapper: React.FC<Props> = ({ color, onChange }) => {
    return (
        <EuiColorPicker color={color} onChange={onChange} />
    );
};

export default ColorPickerWrapper;
