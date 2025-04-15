'use client';

import { ReactFlowProvider } from 'reactflow';
import GraphFlowEditor from './GraphFlowEditor';

/**
 * Provides the necessary context and full-screen layout for the GraphFlowEditor component.
 *
 * It ensures that the GraphFlowEditor has access to the ReactFlowProvider, which is required for managing nodes, edges, and state within the reactflow library.
 *
 * @component
 * @example
 * return (
 *   <GraphPage />
 * );
 */
export default function GraphPage() {
    return (
        <div style={{ width: 'calc(100vw - 250px)', height: '100vh' }}>
            <ReactFlowProvider>
                <GraphFlowEditor />
            </ReactFlowProvider>
        </div>
    );
}
