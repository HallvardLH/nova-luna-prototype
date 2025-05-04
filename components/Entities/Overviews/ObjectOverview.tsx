'use client';

import React from 'react';
import { EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { useModalStore } from '@/stores/useModalStore';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import EntityTable from './EntityTable';

export default function ObjectOverview() {
    const objects = useEntitiesStore((state) => state.objects);
    const open = useModalStore((state) => state.open);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
                <EuiText>
                    Objects are items or interactive elements in your game world. They can be picked up, examined, combined, or used to solve puzzles and progress through gameplay.
                </EuiText>
            </div>

            <EuiSpacer size="m" />

            <EntityTable
                entities={objects}
                icon={<EntityIcon entity="object" size={18} />}
            />

            <EuiSpacer size="m" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <EuiButton iconType="plus" onClick={() => open('addObject')}>
                    Add object
                </EuiButton>
            </div>
        </div>
    );
}
