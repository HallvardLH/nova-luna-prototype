import styles from "./EntityAddMenu.module.css";
import { EntityMap, EntityNames } from "@/app/types/entities";
import { EuiText, EuiHorizontalRule } from "@elastic/eui";
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
}

export default function EntityAddMenu({ entity, visible, entities }: EntityAddMenuProps) {
    if (!visible) return null;
    return (
        <div className={styles.container}>
            <EuiText>
                {entity.charAt(0).toUpperCase() + entity.slice(1) + "s"}
            </EuiText>
            <EuiHorizontalRule style={{ marginBlock: ".5rem" }} />
            <div className={styles.entityInstanceContainer}>
                {entities.map((entityInstance, index) => (
                    <div key={index} className={styles.entityInstance}>
                        <EntityIcon entity={entity} />
                        <EuiText >{entityInstance.name}</EuiText>
                    </div>
                ))}
            </div>
        </div>
    );
}
