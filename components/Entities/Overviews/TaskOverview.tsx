'use client';

import React from 'react';
import { EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { useModalStore } from '@/stores/useModalStore';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import EntityTable from './EntityTable';

export default function TaskOverview() {
    const tasks = useEntitiesStore((state) => state.tasks);
    const open = useModalStore((state) => state.open);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center' }}>
                <EuiText>
                    Tasks define the actions or objectives players must complete. They are tied to quests.
                </EuiText>
            </div>

            <EuiSpacer size="m" />

            <EntityTable
                entities={tasks}
                icon={<EntityIcon entity="task" size={18} />}
            />

            <EuiSpacer size="m" />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <EuiButton iconType="plus" onClick={() => open('addTask')}>
                    Add task
                </EuiButton>
            </div>
        </div>
    );
}
