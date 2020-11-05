export function parseStringAddress(str) {
    if (str[0] !== "/") {
        // String is not an address
        return undefined;
    }

    const [, type, id, property] = str.split(/[/:]/)

    return {
        type,
        id,
        property
    }
}

export function addressToString({ type, id, property }) {
    if (property) {
        return `/${type}/${id}:${property}`
    } else {
        return `/${type}/${id}`
    }
}


export function getPathFromAddress({ type, id, property }) {
    if (!property) {
        return [type, id]
    } else {
        console.error("Not implemented")
    }
}
