import Image from "next/image";
import { EntityNames } from "@/app/types/entities";

interface EntityIconProps {
    entity: EntityNames;
}


export default function EntityIcon({ entity }: EntityIconProps) {
    return (
        <Image
            src={`/entities/${entity}.svg`}
            alt={entity}
            width={24}
            height={24}
        />
    )
}