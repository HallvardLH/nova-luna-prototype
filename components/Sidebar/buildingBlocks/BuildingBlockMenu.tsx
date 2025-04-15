import Image from "next/image";
import { EuiText } from "@elastic/eui";
import styles from "./BuildingBlockMenu.module.css";

interface BuildingBlockMenuProps {
    type: "agent" | "hub" | "task" | "event" | "object";
}

export default function BuildingBlockMenu({ type }: BuildingBlockMenuProps) {
    return (
        <div className={styles.container}>
            <Image
                src={`/buildingBlocks/${type}.svg`}
                alt={type}
                width={24}
                height={24}
            />
            {/* We capitalize the first letter and add an "s", making it plural */}
            <EuiText>{type.charAt(0).toUpperCase() + type.slice(1) + "s"}</EuiText>
        </div>
    );
}