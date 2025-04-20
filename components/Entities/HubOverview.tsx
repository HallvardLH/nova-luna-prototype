import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButtonEmpty,
    EuiFlexGroup,
    EuiFlexItem,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import { useEntitiesStore } from '@/stores/useEntitiesStore';

export default function HubOverview() {
    const isOpen = useModalStore((state) => state.modals.hubOverview);
    const close = useModalStore((state) => state.close);

    const hubs = useEntitiesStore((state) => state.hubs);

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('hubOverview')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Hub Overview</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <EuiFlexGroup wrap gutterSize="m">
                            {hubs.map((hub) => (
                                <EuiFlexItem key={hub.id} grow={false}>
                                    <div
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            backgroundColor: 'green',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            padding: '0.5rem',
                                        }}
                                    >
                                        {hub.name}
                                    </div>
                                </EuiFlexItem>
                            ))}
                        </EuiFlexGroup>
                    </EuiModalBody>

                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={() => close('hubOverview')}>
                            Close
                        </EuiButtonEmpty>
                    </EuiModalFooter>
                </EuiModal>
            )}
        </div>
    );
}
