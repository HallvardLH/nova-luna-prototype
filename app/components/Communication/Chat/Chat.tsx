import Message from "./Message/Message";
import { EuiText, EuiHeader, EuiTitle } from "@elastic/eui";
import styles from './Chat.module.css';

export default function Chat() {
    return (
        <div className={styles.container}>
            <EuiHeader>
                <EuiTitle size="m">
                    <EuiText>Chat</EuiText>
                </EuiTitle>
            </EuiHeader>

            <Message name="Idar Johnsen" message="@Hannah hva driver du med nå?" />
        </div>
    )
}