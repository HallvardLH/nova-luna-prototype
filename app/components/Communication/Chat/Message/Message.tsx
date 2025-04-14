import { EuiAvatar, EuiText } from "@elastic/eui";
import styles from './Message.module.css';

interface MessageProps {
    /**
     * The name of the message sender. Used for display and avatar generation.
     */
    name: string;
    /**
     * The message content.
     */
    message: string;
    /**
     * Timestamp for when the message was sent.
     */
    time?: Date;
    /**
     * Color value to customize the avatar.
     */
    color?: string;
}

/**
 * A simple message display that shows a user's avatar,
 * their name, and the message text.
 *
 * This component uses Elastic UI components for styling and consistency.
 *
 * @param {MessageProps} props - The message data to render.
 * @returns A visual message block with avatar and text.
 */
export default function Message({ name, message }: MessageProps) {
    return (
        <div className={styles.container}>
            <EuiAvatar name={name} size="m" />
            <div>
                <EuiText>{name}</EuiText>
                <EuiText>{message}</EuiText>
            </div>
        </div>
    );
}
