import React from 'react';
import AgentOverview from './Entities/AgentOverview';
import HubOverview from './Entities/HubOverview';
import AddHub from './Entities/AddHub';
import AddAgent from './Entities/AddAgent';
import AddEvent from './Entities/AddEvent';
import AddTask from './Entities/AddTask';

export default function Modals() {
    return (
        <>
            <AgentOverview />
            <HubOverview />
            <AddHub />
            <AddAgent />
            <AddEvent />
            <AddTask />
        </>
    );
}