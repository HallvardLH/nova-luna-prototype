import styles from "./EntityAddMenu.module.css";
import { EntityMap, EntityNames } from "@/app/types/entities";
import { EuiText, EuiHorizontalRule, EuiButton, EuiButtonIcon } from "@elastic/eui";
import EntityIcon from "./EntityIcon";
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
    if (!visible) return null;
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <EuiText>
                    {entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}
                </EuiText>
                <EuiButtonIcon onClick={onClose} iconType={"cross"} />
            </div>
            <EuiHorizontalRule style={{ marginBlock: ".5rem" }} />
            <div className={styles.entityInstanceContainer}>
                {entities.map((entityInstance, index) => (
                    <div key={index} className={styles.entityInstance}>
                        <EntityIcon entity={entity} />
                        <EuiText >{entityInstance.name}</EuiText>
                    </div>
                ))}
            </div>
            <EuiHorizontalRule style={{ marginBlock: ".5rem" }} />
            <EuiButton iconType={"plusInCircle"}>
                New
            </EuiButton>
        </div>
    );
}
