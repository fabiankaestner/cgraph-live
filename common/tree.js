export function transformStateToDisplayTree(state, tree, parentGroup) {
    const display_tree = [];

    for (let item of tree) {

        const { type, id, playback } = addressFromString(item)

        if (type === "playback") {
            // we have a leaf node

            display_tree.push({
                title: state.playbacks[playback].instances[id].name,
                isLeaf: true,
                data: { address: item }
            });

        } else if (type === "group" && id !== parentGroup) {
            // we have a group that is different from the parent group => recursively evaluate.
            const group = state.groups[id];
            display_tree.push({
                title: group.name,
                children: transformStateToDisplayTree(state, group.tree, id),
                data: { address: item }
            });
        }
    }
    return display_tree;
}

export function addressFromString(str) {
    const [type, ...path] = str.split("/")

    if (type === "playback") {
        const [playback, id] = path
        return {
            type: "playback",
            playback,
            id
        }
    } else if (type === "rundown") {
        const [id] = path
        return {
            type: "rundown",
            id
        }
    } else if (type === "group") {
        const [id] = path
        return {
            type: "group",
            id
        }
    }
}

export function addressToString(addr) {
    if (addr.type === "playback") {
        return `${addr.type}/${addr.playback}/${addr.id}`
    } else {
        return `${addr.type}/${addr.id}`
    }
}

export function getPathFromState(state, path) {
    let current = state
    for (let seg of path) {
        if (current[seg]) {
            current = current[seg]
        } else {
            return undefined
        }
    }
    return current
}

export function getPathFromAddress(state, address) {
    const path = []
    if (address.type === "playback") {
        path.push("playbacks", address.playback, "instances", address.id)
    } else if (address.type === "group" || address.type === "rundown") {
        path.push(`${address.type}s`, address.id)
    }
    return getPathFromState(state, path)
}
