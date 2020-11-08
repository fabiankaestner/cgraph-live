import { Address } from "../store/types/address";
import { StatePath } from "../store/types/stateTree";

export function parseStringAddress(str: string): Address | undefined {
    if (str[0] !== "/") {
        // String is not an address
        return undefined;
    }

    const [, type, id, property] = str.split(/[/:]/);

    return {
        type,
        id,
        property
    };
}

export function addressToString({ type, id, property }: Address): string {
    if (property) {
        return `/${type}/${id}:${property}`;
    } else {
        return `/${type}/${id}`;
    }
}

export function getPathFromAddress({ type, id, property }: Address): StatePath {
    if (!property) {
        return [type, id];
    } else {
        console.error("Not implemented");
        return [];
    }
}
