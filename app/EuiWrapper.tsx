'use client';

// The intention of this wrapper is to separate a client-side component from the layout component

import { EuiProvider } from '@elastic/eui';

export function EuiWrapper({ children }: { children: React.ReactNode }) {
    return <EuiProvider>{children}</EuiProvider>;
}
