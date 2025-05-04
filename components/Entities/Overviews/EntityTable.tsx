'use client';

import React from 'react';
import { EuiText } from '@elastic/eui';

interface Entity {
    id: string;
    name: string;
    description: string;
}

interface EntityTableProps {
    entities: Entity[];
    icon?: React.ReactNode;
    title?: string;
}

export default function EntityTable({ entities, icon }: EntityTableProps) {
    return (
        <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
            <table style={{ width: '80%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {icon && <th style={{ textAlign: 'left', padding: '12px' }}></th>}
                        <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '12px' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map((entity) => (
                        <tr key={entity.id} style={{ borderTop: '1px solid #D3DAE6' }}>
                            {icon && <td style={{ padding: '12px' }}>{icon}</td>}
                            <td style={{ padding: '12px' }}>
                                <EuiText size="s">{entity.name}</EuiText>
                            </td>
                            <td style={{ padding: '12px' }}>
                                <EuiText size="s">{entity.description}</EuiText>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
