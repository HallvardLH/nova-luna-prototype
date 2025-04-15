'use client';

import React from 'react';

interface DeleteEdgeTooltipProps {
    /**
     * The X coordinate (in pixels) where the tooltip should appear on the screen.
     */
    x: number;
    /**
     * The Y coordinate (in pixels) where the tooltip should appear on the screen.
     */
    y: number;
    /**
     * Callback function to execute when the tooltip is clicked, typically to delete the selected edge.
     */
    onDelete: () => void;
}

/**
 * A tooltip component that appears near a selected edge, allowing the user to delete it.
 *
 * This tooltip appears at a fixed position on the screen based on mouse coordinates,
 * and disappears when the user clicks elsewhere or performs a delete action.
 *
 * @param {DeleteEdgeTooltipProps} props - The properties used to render the tooltip.
 * @returns A styled div that acts as a delete button for edges.
 */
export default function DeleteEdgeTooltip({ x, y, onDelete }: DeleteEdgeTooltipProps) {
    return (
        <div
            style={{
                position: 'fixed',
                top: y + 8,
                left: x + 8,
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 1000,
                cursor: 'pointer',
                fontSize: '14px'
            }}
            onClick={(e) => {
                e.stopPropagation(); // Prevent tooltip click from triggering global click listeners.
                onDelete();
            }}
        >
            🗑️ <span>Delete</span>
        </div>
    );
}
