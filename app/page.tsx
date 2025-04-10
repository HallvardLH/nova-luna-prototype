'use client';  // To be removed

import styles from "./page.module.css";
import { EuiButton } from "@elastic/eui";
import Chat from "./components/chat/Chat";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chat />
        <EuiButton>Test</EuiButton>
      </main>
    </div>
  );
}
