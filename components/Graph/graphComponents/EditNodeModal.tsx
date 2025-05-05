import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
} from '@elastic/eui';
import { useModalStore } from '@/stores/useModalStore';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import EntityTable from '@/components/Entities/Overviews/EntityTable';
import EntityIcon from '@/components/Sidebar/buildingBlocks/EntityIcon';
import { useGraphStore } from '@/stores/useGraphStore';

export default function EditNodeModal() {
    const isOpen = useModalStore((state) => state.modals.editNode);
    const close = useModalStore((state) => state.close);

    const agents = useEntitiesStore((state) => state.agents);
    const objects = useEntitiesStore((state) => state.objects);

    const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
    const updateNodeData = useGraphStore((state) => state.updateNodeData);

    const handleAddEntity = (type: 'agent' | 'object', id: string) => {
        if (!selectedNodeId) return;

        updateNodeData(selectedNodeId, (data) => {
            const key = type + 's';
            const alreadyHasEntity = Array.isArray(data[key]) && data[key].length > 0;

            if (alreadyHasEntity) return data; // Only allow one of each type

            return {
                ...data,
                [key]: [id],
            };
        });
    };


    return (
        <>
            {isOpen && (
                <EuiModal onClose={() => close('editNode')}>
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>Edit Task</EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>
                        <h3>Agents</h3>
                        <EntityTable
                            entities={agents}
                            icon={<EntityIcon entity="agent" size={18} />}
                            onEntityClick={(entity) => handleAddEntity('agent', entity.id)}
                        />
                        <h3>Objects</h3>
                        <EntityTable
                            entities={objects}
                            icon={<EntityIcon entity="object" size={18} />}
                            onEntityClick={(entity) => handleAddEntity('object', entity.id)}
                        />
                    </EuiModalBody>
                </EuiModal>
            )}
        </>
    );
}
