import Chat from "./Chat/Chat";
import styles from './Communication.module.css';
import { EuiFlyout, EuiButton } from "@elastic/eui";
import { useState } from 'react';

export default function Communication() {
    const [isFlyoutVisible, setIsFlyoutVisible] = useState({
        chat1: false,
        chat2: false
    });

    const toggleFlyout = (chat: 'chat1' | 'chat2') => {
        setIsFlyoutVisible(prev => ({
            ...prev,
            [chat]: !prev[chat]
        }));
    };

    const closeFlyout = (chat: 'chat1' | 'chat2') => {
        setIsFlyoutVisible(prev => ({
            ...prev,
            [chat]: false
        }));
    };

    // Custom style for the flyouts
    const flyoutStyle = {
        height: '50vh', // 50% of viewport height
        top: isFlyoutVisible.chat1 && isFlyoutVisible.chat2 ? '50vh' : 'auto',
        transform: 'none'
    };

    return (
        <div className={styles.container}>
            {/* First Chat with Flyout */}
            <EuiButton onClick={() => toggleFlyout('chat1')}>
                Open Chat 1
            </EuiButton>

            {/* Second Chat with Flyout */}
            <EuiButton onClick={() => toggleFlyout('chat2')}>
                Open Chat 2
            </EuiButton>

            {/* First Flyout (bottom when both are open) */}
            {isFlyoutVisible.chat1 && (
                <EuiFlyout
                    ownFocus={false}
                    size="350px"
                    onClose={() => closeFlyout('chat1')}
                    aria-labelledby="chat1-flyout"
                    style={{
                        ...flyoutStyle,
                        top: isFlyoutVisible.chat2 ? '50vh' : 'auto'
                    }}
                    className="custom-flyout"
                >
                    <Chat />
                </EuiFlyout>
            )}

            {/* Second Flyout (top when both are open) */}
            {isFlyoutVisible.chat2 && (
                <EuiFlyout
                    ownFocus={false}
                    size="350px"
                    onClose={() => closeFlyout('chat2')}
                    aria-labelledby="chat2-flyout"
                    style={{
                        ...flyoutStyle,
                        top: '0'
                    }}
                    className="custom-flyout"
                >
                    <Chat />
                </EuiFlyout>
            )}
        </div>
    );
}