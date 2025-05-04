'use client';

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
import { ModalName, useModalStore } from '@/stores/useModalStore';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import EntityIcon from '../Sidebar/buildingBlocks/EntityIcon';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { EntityMap, EntityNames } from '@/app/types/entities';
import { capitalizeFirstLetter } from '@/app/misc/helpers';

interface AddEntityProps {
    entity: EntityNames;
    modalName: ModalName;
}

export default function AddEntity({ entity, modalName }: AddEntityProps) {
    const isOpen = useModalStore((state) => state.modals[modalName]);
    const close = useModalStore((state) => state.close);

    const add = useEntitiesStore((state) => state.actions.add);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        if (!name.trim()) return;

        add(entity + "s" as keyof EntityMap, {
            id: nanoid(),
            name: name,
            description: description,
        });

        setName('');
        setDescription('');
        close(modalName);
    };

    return (
        <div>
            {isOpen && (
                <EuiModal onClose={() => close(modalName)}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Create new {entity}</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <EuiFlexGroup direction="column" gutterSize="m">
                            <EuiFlexItem grow={false}>
                                <EntityIcon entity={entity} size={150} />
                            </EuiFlexItem>

                            <EuiFlexItem>
                                <EuiFormRow label={`${capitalizeFirstLetter(entity)} name`}>
                                    <EuiFieldText
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={`Enter ${entity} name`}
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>

                            <EuiFlexItem>
                                <EuiFormRow label="Description">
                                    <EuiTextArea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={`Enter ${entity} description`}
                                        rows={4}
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiModalBody>

                    <EuiModalFooter>
                        <EuiButtonEmpty onClick={() => close(modalName)}>
                            Cancel
                        </EuiButtonEmpty>
                        <EuiButton fill onClick={handleCreate} isDisabled={!name.trim()}>
                            Create {capitalizeFirstLetter(entity)}
                        </EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            )}
        </div>
    );
}
