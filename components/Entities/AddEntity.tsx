'use client';

import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiFlexItem,
    EuiFormRow,
    EuiFieldText,
    EuiTextArea,
    EuiButton,
    EuiIcon
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
                        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
                            <EuiFlexItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "2rem" }}>
                                <EuiFormRow label={`${capitalizeFirstLetter(entity)} name`}>
                                    <EuiFieldText
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={`Enter ${entity} name`}
                                    />
                                </EuiFormRow>
                                <EntityIcon entity={entity} size={150} />
                            </EuiFlexItem>

                            <EuiFlexItem>
                                <EuiFormRow label="Description">
                                    <EuiTextArea
                                        style={{ width: '1000px' }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={`Enter ${entity} description`}
                                        rows={8}
                                    />
                                </EuiFormRow>
                            </EuiFlexItem>
                        </div>
                    </EuiModalBody>

                    <EuiModalFooter>

                        <EuiButton
                            iconType={() => <EuiIcon type="minimize" style={{ fill: '#6034FF' }} />}
                            onClick={() => close(modalName)}
                        >
                            Close
                        </EuiButton>
                        <EuiButton
                            iconType={() => <EuiIcon type="plus" style={{ fill: '#6034FF' }} />}
                            // fill
                            onClick={handleCreate}
                            isDisabled={!name.trim()}
                        >
                            Create {capitalizeFirstLetter(entity)}
                        </EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            )}
        </div>
    );
}
