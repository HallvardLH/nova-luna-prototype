'use client';

import styles from "./page.module.css";
// import Communication from "@/components/Communication/Communication";
import GraphPage from "@/components/Graph/GraphPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { EuiPageSidebar, EuiPageSection } from "@elastic/eui";
import Modals from "@/components/Modals";
// import Toolbar from "@/components/Toolbar/Toolbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    // Check if localStorage has data on initial load
    // If not, redirect to landing page
    useEffect(() => {
        const hasData = localStorage.getItem('graph-flow-data');

        console.log('hasData', hasData);

        if (!hasData) {
            router.replace('/landing');
        }
    }, [router]);


    return (
        <>
            <div className={styles.page}>

                <EuiPageSidebar className={styles.sidebar} sticky>
                    <Sidebar />
                </EuiPageSidebar>
                <div>

                    {/* <Communication /> */}

                    <EuiPageSection paddingSize="none" color="transparent" className={styles.graphSection}>
                        <GraphPage />
                    </EuiPageSection>

                    {/* <Toolbar /> */}

                </div>
            </div>
            <Modals />
        </>
    );
}