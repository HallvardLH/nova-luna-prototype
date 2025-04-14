import Chat from "./Chat/Chat"
import styles from './Communication.module.css';

export default function Communication() {
    return (
        <div className={styles.container}>
            <Chat />
            <Chat />
        </div>
    )
}