import { EuiText } from "@elastic/eui";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useEntitiesStore } from "@/stores/useEntitiesStore";
import styles from "./EntityButton.module.css";
import { EntityNames, EntityMap } from "@/app/types/entities";
import EntityAddMenu from "./EntityAddMenu";
import EntityIcon from "./EntityIcon";
import { EntitiesState } from "@/stores/useEntitiesStore";

interface EntityButtonProps {
    entity: EntityNames;
}

export default function EntityButton({ entity }: EntityButtonProps) {
    const selectedEntity = useSidebarStore((state) => state.selectedEntity);
    const setSelectedEntity = useSidebarStore((state) => state.setSelectedEntity);
    const isSelected = selectedEntity === entity;

    // Dynamically get the correct array of entities from the store
    const entities: EntityMap[keyof EntityMap] = useEntitiesStore((state) => state[entity + "s" as keyof EntitiesState]) as EntityMap[keyof EntityMap];

    const handleClick = () => {
        setSelectedEntity(entity);
    };

    const handleClose = () => {
        setSelectedEntity("none");
    };

    return (
        <div className={styles.buttonWrapper}>
            <button
                onClick={handleClick}
                className={`${styles.container} ${isSelected ? styles.selected : ""}`}
            >
                <EntityIcon entity={entity} />
                <EuiText>
                    {entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}
                </EuiText>
            </button>

            {isSelected && (
                <div className={styles.menu}>
                    <EntityAddMenu
                        entity={entity}
                        visible={true}
                        onClose={handleClose}
                        entities={entities}
                    />
                </div>
            )}
        </div>
    );
}
