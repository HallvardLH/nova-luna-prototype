'use client';

import { EuiProvider } from '@elastic/eui';

interface EuiWrapperProps {
    /**
     * The child components that will be rendered within the EuiProvider context.
     */
    children: React.ReactNode;
}

/**
 * A client-side wrapper component that provides Elastic UI (EUI) context to its children.
 *
 * This component ensures the `EuiProvider` is only rendered on the client side by using the `'use client'` directive.
 * It's especially useful when EUI components are used inside a Next.js layout or app structure.
 *
 * @param {EuiWrapperProps} props - Contains children React nodes to wrap in EUI context.
 * @returns A JSX element that wraps children in an EuiProvider.
 */
export function EuiWrapper({ children }: EuiWrapperProps) {
    return <EuiProvider>{children}</EuiProvider>;
}
