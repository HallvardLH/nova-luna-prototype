'use client';

import React from 'react';
import { EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { useModalStore } from '@/stores/useModalStore';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import EntityTable from './EntityTable';

export default function AgentOverview() {
    const agents = useEntitiesStore((state) => state.agents);
    const open = useModalStore((state) => state.open);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
                <EuiText>
                    Agents are the active characters in your game. They interact with the player, offer quests, provide assistance, and help drive the story forward.
                </EuiText>
            </div>

            <EuiSpacer size="m" />

            <EntityTable
                entities={agents}
                icon={<EntityIcon entity="agent" size={18} />}
            />

            <EuiSpacer size="m" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <EuiButton iconType="plus" onClick={() => open('addAgent')}>
                    Add agent
                </EuiButton>
            </div>
        </div>
    );
}
