'use client';

import styles from "./page.module.css";
import Communication from "@/components/Communication/Communication";
import GraphPage from "@/components/Graph/GraphPage";
import Sidebar from "@/components/Sidebar/Sidebar";
import { EuiPage, EuiPageBody, EuiPageSidebar, EuiPageSection } from "@elastic/eui";
import Modals from "@/components/Modals";
import Toolbar from "@/components/Toolbar/Toolbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Toolbar />
      <EuiPage paddingSize="none" className={styles.main}>
        {/* Sidebar Section */}
        <EuiPageSidebar className={styles.sidebar} sticky>
          <Sidebar />
        </EuiPageSidebar>

        {/* Main Content Section */}
        <EuiPageBody panelled paddingSize="none">
          {/* Communication Section (top) */}
          {/* <EuiPageSection paddingSize="none" color="transparent"> */}
          <Communication />
          {/* </EuiPageSection> */}

          {/* Graph Content Section */}
          <EuiPageSection paddingSize="none" color="transparent" className={styles.graphSection}>
            <GraphPage />
          </EuiPageSection>
        </EuiPageBody>
      </EuiPage>
      <Modals />
    </div>
  );
}