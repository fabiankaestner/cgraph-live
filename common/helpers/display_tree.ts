import { StringAddress } from "../store/types/address";
import { State } from "../store/types/state";
import { StateTree } from "../store/types/stateTree";
import { parseStringAddress } from "./address";
import { TreeNode, TreePath } from "./tree";

export function transformStateToDisplayTree(
    state: State,
    tree: StateTree,
    parentGroup?: StringAddress,
    parentPath?: TreePath
) {
    const display_tree: TreeNode[] = [];

    const _parentPath = parentPath || [];

    let idx = 0;

    for (let node_addr of tree) {
        const address = parseStringAddress(node_addr);
        if (!address) {
            continue;
        }

        const { type, id } = address;
        const path = [..._parentPath, idx];

        if (type === "node") {
            // we have a leaf node

            display_tree.push({
                title: state.node[id].props.name.value,
                address: node_addr,
                path
            });
        } else if (type === "group" && id !== parentGroup) {
            // we have a group that is different from the parent group => recursively evaluate.
            const group = state.group[id];
            display_tree.push({
                title: group.props.name.value,
                address: node_addr,
                path,
                children: transformStateToDisplayTree(
                    state,
                    group.tree,
                    id,
                    path
                )
            });
        }
        idx++;
    }
    return display_tree;
}
