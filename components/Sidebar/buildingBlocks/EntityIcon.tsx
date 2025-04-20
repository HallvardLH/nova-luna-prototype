import Image from "next/image";
import { EntityNames } from "@/app/types/entities";

interface EntityIconProps {
    entity: EntityNames;
    size?: number; // Optional size prop to set the width and height of the icon
}


export default function EntityIcon({ entity, size = 24 }: EntityIconProps) {
    return (
        <Image
            src={`/entities/${entity}.svg`}
            alt={entity}
            width={size}
            height={size}
        />
    )
}