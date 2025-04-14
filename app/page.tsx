'use client';  // To be removed

import styles from "./page.module.css";
// import Communication from "./components/Communication/Communication";
import GraphPage from "./components/Graph/GraphPage";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Communication /> */}
        <GraphPage />
      </main>
    </div>
  );
}
