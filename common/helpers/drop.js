import { getStrAddressFromState } from "./getters";

export function drop(state, { source, nodes, cursor }) {
    // move a node in the rundown tree

    console.log(cursor);

    const { tree } = getStrAddressFromState(state, source);

    console.log(cursor);

    console.log(tree);

    if (tree) {
        const toDelete = [];

        // go through all dragged child elements
        for (let node of nodes) {
            // descend the tree until we arrive at the correct level
            let ptr = tree;
            const idx = node.path[node.path.length - 1];
            let address = source;
            for (let i = 0; i < node.path.length - 1; i++) {
                address = ptr[node.path[i]];
                ptr = getStrAddressFromState(state, address).tree;
            }

            // mark the node for removal
            toDelete.push({ node: ptr[idx], address, idx });
        }

        let ptr = tree;

        let insertAddr = source;
        let insertIdx = 0;

        // descend to the target level
        for (let i = 0; i < cursor.path.length - 1; i++) {
            insertAddr = ptr[cursor.path[i]];
            ptr = getStrAddressFromState(state, insertAddr).tree;
        }

        if (cursor.position === "inside") {
            // descend one more level down and insert at the start of array
            insertAddr = ptr[cursor.path[cursor.path.length - 1]];
            ptr = getStrAddressFromState(state, insertAddr).tree;
            ptr.unshift(...toDelete.map(({ node }) => node));
        } else {
            // insert elements before or after idx el depending on placement argument
            insertIdx = cursor.path[cursor.path.length - 1];
            if (cursor.position === "after") {
                insertIdx = insertIdx + 1;
            }
            console.log();
            ptr.splice(insertIdx, 0, ...toDelete.map(({ node }) => node));
        }

        const deletedAtAddress = {};

        console.log(toDelete);

        // delete the marked nodes
        for (let { idx, address } of toDelete) {
            console.log(address);
            let calc_idx = idx;
            if (deletedAtAddress[address]) {
                deletedAtAddress[address].push(idx);
            } else {
                deletedAtAddress[address] = [idx];
            }
            if (address === insertAddr) {
                if (idx >= insertIdx) {
                    calc_idx += toDelete.length;
                }
            }
            const offset = deletedAtAddress[address].reduce(
                (prev, curr) => (curr < idx ? prev + 1 : prev),
                0
            );
            calc_idx -= offset;
            console.log("deleting ", address, " ", calc_idx, offset);
            getStrAddressFromState(state, address).tree.splice(calc_idx, 1);
        }
    }
}
