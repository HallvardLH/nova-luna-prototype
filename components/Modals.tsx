import React from 'react';
import AgentOverview from './Entities/AgentOverview';
import HubOverview from './Entities/HubOverview';
import AddHub from './Entities/AddHub';

export default function Modals() {
    return (
        <>
            <AgentOverview />
            <HubOverview />
            <AddHub />
        </>
    );
}