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
    return path
}

export function getStrAddressFromState(state, str) {
    const address = addressFromString(str)
    const path = getPathFromAddress(state, address)
    return getPathFromState(state, path)
}

export function drag(state, { rundown, dragged, target, placement }) {

    // move a node in the rundown tree

    const tree = getPathFromState(state, ["rundowns", rundown, "tree"])
    if (tree) {
        const toDelete = []

        // go through all dragged child elements
        for (let node of dragged) {
            // descend the tree until we arrive at the correct level
            let ptr = tree
            const idx = node.path[node.path.length - 1]
            let address = `rundown/${rundown}`
            for (let i = 0; i < node.path.length - 1; i++) {
                address = ptr[node.path[i]]
                ptr = getStrAddressFromState(state, address).tree
            }

            // mark the node for removal
            toDelete.push({ node: ptr[idx], address, idx })
        }

        let ptr = tree

        let insertAddr = `rundown/${rundown}`
        let insertIdx = 0

        // descend to the target level
        for (let i = 0; i < target.path.length - 1; i++) {
            insertAddr = ptr[target.path[i]]
            ptr = getStrAddressFromState(state, insertAddr).tree
        }

        if (placement === "inside") {
            // descend one more level down and insert at the start of array
            insertAddr = ptr[target.path[target.path.length - 1]]
            ptr = getStrAddressFromState(state, insertAddr).tree
            ptr.unshift(...toDelete.map(({ node }) => node))
        } else {
            // insert elements before or after idx el depending on placement argument
            insertIdx = target.path[target.path.length - 1]
            if (placement === "after") { insertIdx = insertIdx + 1 }
            ptr.splice(insertIdx, 0, ...toDelete.map(({ node }) => node))
        }

        // delete the marked nodes
        for (let { idx, address } of toDelete) {
            let calc_idx = idx
            if (address === insertAddr) {
                if (idx >= insertIdx) {
                    calc_idx += toDelete.length
                }
            }
            getStrAddressFromState(state, address).tree.splice(calc_idx,1)
        }
    }
}