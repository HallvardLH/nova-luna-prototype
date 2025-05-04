'use client';

import React from 'react';
import { EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { useModalStore } from '@/stores/useModalStore';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import EntityTable from './EntityTable';

export default function HubOverview() {
    const hubs = useEntitiesStore((state) => state.hubs);
    const open = useModalStore((state) => state.open);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
                <EuiText>
                    Hubs are central locations in your game where players can explore, interact with agents, access quests, and progress the story. They serve as key points of activity and navigation.
                </EuiText>
            </div>

            <EuiSpacer size="m" />

            <EntityTable
                entities={hubs}
                icon={<EntityIcon entity="hub" size={18} />}
            />

            <EuiSpacer size="m" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <EuiButton iconType="plus" onClick={() => open('addHub')}>
                    Add hub
                </EuiButton>
            </div>
        </div>
    );
}
