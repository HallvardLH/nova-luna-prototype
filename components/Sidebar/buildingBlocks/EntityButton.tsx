import { EuiText } from "@elastic/eui";
import { useSidebarStore } from "@/stores/useSidebarStore";
import styles from "./EntityButton.module.css";
import { EntityNames } from "@/app/types/entities";
import EntityAddMenu from "./EntityAddMenu";
import EntityIcon from "./EntityIcon";

interface EntityButtonProps {
    entity: EntityNames;
}

export default function EntityButton({ entity }: EntityButtonProps) {
    const selectedEntity = useSidebarStore((state) => state.selectedEntity);
    const setSelectedEntity = useSidebarStore((state) => state.setSelectedEntity);

    const handleClick = () => {
        setSelectedEntity(entity);
    };

    const handleClose = () => {
        setSelectedEntity("none");
    }

    const isSelected = selectedEntity === entity;

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
                        entities={[
                            {
                                id: "agent-001",
                                name: "Shadowblade",
                                description: "A stealthy operative from the east.",
                                appearances: ["event-003", "event-007"]
                            },
                            {
                                id: "agent-002",
                                name: "Nova Spark",
                                description: "Radiates pure chaotic energy.",
                                appearances: ["event-001"]
                            },
                            {
                                id: "agent-003",
                                name: "The Archivist",
                                description: "Knows every secret, including yours.",
                                appearances: []
                            },
                            {
                                id: "agent-002",
                                name: "Mister long name. His name is really long and has a tendency to mess up UIs",
                                description: "Radiates pure chaotic energy.",
                                appearances: ["event-001"]
                            },
                            {
                                id: "agent-002",
                                name: "Nova Spark",
                                description: "Radiates pure chaotic energy.",
                                appearances: ["event-001"]
                            },
                            {
                                id: "agent-002",
                                name: "Nova Spark",
                                description: "Radiates pure chaotic energy.",
                                appearances: ["event-001"]
                            },
                            {
                                id: "agent-002",
                                name: "Nova Spark",
                                description: "Radiates pure chaotic energy.",
                                appearances: ["event-001"]
                            },
                        ]}
                    />
                </div>
            )}
        </div>
    );
}
