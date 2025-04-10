import Message from "./Message/Message";
import { EuiText, EuiHeader, EuiTitle } from "@elastic/eui";

export default function Chat() {
    return (
        <div>
            <EuiHeader>
                <EuiTitle size="m">
                    <EuiText>Chat</EuiText>
                </EuiTitle>
            </EuiHeader>

            <Message name="Idar Johnsen" message="@Hannah hva driver du med nå?" />
        </div>
    )
}