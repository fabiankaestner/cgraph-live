import { getPathFromState, getStrAddressFromState } from "./getters";
import { State } from "../store/types/state";
import { StateTree } from "../store/types/stateTree";
import { StringAddress } from "../store/types/address";

export interface DropOperation {
    rundown: string;
    dragged: TreeNode[];
    target: TreeNode;
    placement: string;
}

export type TreePath = number[];

export interface TreeNode {
    path: TreePath;
    title: string;
    address: StringAddress;
    children?: TreeNode[];
}

interface NodeToDelete {
    node: StringAddress;
    address: StringAddress;
    idx: number;
}

export function drop(
    state: State,
    { rundown, dragged, target, placement }: DropOperation
) {
    // move a node in the rundown tree

    const tree: StateTree = getPathFromState(state, [
        "rundowns",
        rundown,
        "tree"
    ]);
    if (tree) {
        const toDelete: NodeToDelete[] = [];

        // go through all dragged child elements
        for (let node of dragged) {
            // descend the tree until we arrive at the correct level
            let ptr = tree;
            const idx = node.path[node.path.length - 1];
            let address = `rundown/${rundown}`;
            for (let i = 0; i < node.path.length - 1; i++) {
                address = ptr[node.path[i]];
                ptr = getStrAddressFromState(state, address).tree;
            }

            // mark the node for removal
            toDelete.push({ node: ptr[idx], address, idx });
        }

        let ptr = tree;

        let insertAddr = `rundown/${rundown}`;
        let insertIdx = 0;

        // descend to the target level
        for (let i = 0; i < target.path.length - 1; i++) {
            insertAddr = ptr[target.path[i]];
            ptr = getStrAddressFromState(state, insertAddr).tree;
        }

        if (placement === "inside") {
            // descend one more level down and insert at the start of array
            insertAddr = ptr[target.path[target.path.length - 1]];
            ptr = getStrAddressFromState(state, insertAddr).tree;
            ptr.unshift(...toDelete.map(({ node }) => node));
        } else {
            // insert elements before or after idx el depending on placement argument
            insertIdx = target.path[target.path.length - 1];
            if (placement === "after") {
                insertIdx = insertIdx + 1;
            }
            ptr.splice(insertIdx, 0, ...toDelete.map(({ node }) => node));
        }

        const deletedAtAddress: { [key: string]: number[] } = {};

        // delete the marked nodes
        for (let { idx, address } of toDelete) {
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
