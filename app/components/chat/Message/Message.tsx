import { EuiAvatar, EuiText } from "@elastic/eui";
import styles from './Message.module.css';

interface MessageProps {
    name: string,
    message: string,
    time?: Date,
    color?: string,
}

export default function Message({ name, message, time, color }: MessageProps) {
    return (
        <div className={styles.container}>
            <EuiAvatar name={name} size="m" />
            <div>
                <EuiText>{name}</EuiText>
                <EuiText>{message}</EuiText>
            </div>
        </div>
    )
}