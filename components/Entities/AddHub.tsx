import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButtonEmpty,
    EuiFlexGroup,
    EuiFlexItem,
    EuiFormRow,
    EuiFieldText,
    EuiTextArea,
    EuiButton,
} from '@elastic/eui';
import { useModalStore } from '@/stores/modalStore';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import EntityIcon from '../Sidebar/buildingBlocks/EntityIcon';
import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function AddHub() {
    const isOpen = useModalStore((state) => state.modals.addHub);
    const close = useModalStore((state) => state.close);

    const addHub = useEntitiesStore((state) => state.actions.add);

    const [hubName, setHubName] = useState('');
    const [hubDescription, setHubDescription] = useState('');

    const handleCreateHub = () => {
        if (!hubName.trim()) return;

        addHub('hubs', {
            id: nanoid(),
            name: hubName,
            description: hubDescription,
        });

        setHubName('');
        setHubDescription('');
        close('addHub');
    };

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close('addHub')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Create new hub</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <EuiFlexGroup direction="column" gutterSize="m">
                            <EuiFlexItem grow={false}>
                                <EntityIcon entity="hub" size={150} />
                            </EuiFlexItem>

                            <EuiFlexItem>
                                <EuiFormRow label="Hub Name">
                                    <EuiFieldText
                                        value={hubName}
                                        onChange={(e) => setHubName(e.target.value)}
                                        placeholder="Enter hub name"
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>

                            <EuiFlexItem>
                                <EuiFormRow label="Description">
                                    <EuiTextArea
                                        value={hubDescription}
                                        onChange={(e) => setHubDescription(e.target.value)}
                                        placeholder="Enter hub description"
                                        rows={4}
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiModalBody>

                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={() => close('addHub')}>
                            Cancel
                        </EuiButtonEmpty>
                        <EuiButton fill onClick={handleCreateHub} isDisabled={!hubName.trim()}>
                            Create Hub
                        </EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            )}
        </div>
    );
}
