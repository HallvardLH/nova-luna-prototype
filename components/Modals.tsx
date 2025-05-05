'use client'

import React from 'react';
import AgentOverview from './Entities/AgentOverviewModal';
import HubOverview from './Entities/HubOverviewModal';
import ObjectOverview from './Entities/ObjectOverviewModal';
import AddHub from './Entities/AddHub';
import AddAgent from './Entities/AddAgent';
import AddObject from './Entities/AddObject';
import AddEvent from './Entities/AddEvent';
import AddTask from './Entities/AddTask';
import EditNodeModal from './Graph/graphComponents/EditNodeModal';

export default function Modals() {
    return (
        <>
            <AgentOverview />
            <HubOverview />
            <ObjectOverview />

            <AddHub />
            <AddAgent />
            <AddObject />
            <AddEvent />
            <AddTask />

            <EditNodeModal />
        </>
    );
}