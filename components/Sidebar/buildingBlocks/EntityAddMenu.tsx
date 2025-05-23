import styles from "./EntityAddMenu.module.css";
import { EntityMap, EntityNames } from "@/app/types/entities";
import { EuiText, EuiHorizontalRule, EuiButton, EuiButtonIcon } from "@elastic/eui";
import EntityIcon from "./EntityIcon";
import { useModalStore, ModalName } from '@/stores/useModalStore';
import { useDragStore } from "@/stores/useDragStore";
import { capitalizeFirstLetter } from "@/app/misc/helpers";
/**
 * Displays a menu containing:
 * All already created entities for a given entity type
 * Allows the user to add new entities for the given entity type
 */
interface EntityAddMenuProps {
    entity: EntityNames,
    visible: boolean,
    entities: EntityMap[keyof EntityMap];
    onClose: () => void;
}

export default function EntityAddMenu({ entity, visible, entities, onClose }: EntityAddMenuProps) {


    const open = useModalStore((state) => state.open);
    const onSeeAll = () => {
        open(entity + "Overview" as ModalName);
    }

    const openCreateNew = () => {
        open("add" + capitalizeFirstLetter(entity) as ModalName);
    }

    if (!visible) return null;

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <EuiText>
                    {capitalizeFirstLetter(entity) + "s"}
                </EuiText>
                <EuiButtonIcon onClick={onClose} iconType={"cross"} />
            </div>
            <EuiHorizontalRule style={{ marginBlock: ".5rem" }} />
            <EuiButton onClick={onSeeAll}>
                Open {entity} overview
            </EuiButton>
            <EuiHorizontalRule style={{ marginBlock: ".5rem" }} />
            <div className={styles.entityInstanceContainer}>
                {entities.map((entityInstance, index) => (
                    <div
                        key={index}
                        className={styles.entityInstance}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData('application/reactflow', entityInstance.name);
                            e.dataTransfer.effectAllowed = 'move';
                            useDragStore.getState().setDraggedEntity({
                                type: entity,
                                name: entityInstance.name
                            });
                        }}
                        onDragEnd={() => {
                            useDragStore.getState().clearDraggedEntity();
                        }}
                    >
                        <EntityIcon entity={entity} />
                        <EuiText>{entityInstance.name}</EuiText>
                    </div>

                ))}
            </div>
            <EuiHorizontalRule style={{ marginBlock: ".5rem" }} />
            <EuiButton onClick={openCreateNew} iconType={"plusInCircle"}>
                New
            </EuiButton>
        </div>
    );
}
