'use client';

import React from 'react';
import { EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { useModalStore } from '@/stores/useModalStore';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import EntityTable from './EntityTable';

export default function EventOverview() {
    const events = useEntitiesStore((state) => state.events);
    const open = useModalStore((state) => state.open);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
                <EuiText>
                    Events, or quests, are the actions that agents can perform. They can be anything from &quot;pick up an object&quot; to &quot;go to a location&quot;.
                </EuiText>
            </div>

            <EuiSpacer size="m" />

            <EntityTable
                entities={events}
                icon={<EntityIcon entity="event" size={18} />}
            />

            <EuiSpacer size="m" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <EuiButton iconType="plus" onClick={() => open('addEvent')}>
                    Add event
                </EuiButton>
            </div>
        </div>
    );
}
