import { parseStringAddress } from "./address"

export function transformStateToDisplayTree(state, tree, parentGroup) {
    const display_tree = [];

    for (let node_addr of tree) {

        const { type, id } = parseStringAddress(node_addr)

        if (type === "node") {
            // we have a leaf node

            display_tree.push({
                title: state.node[id]._props.name.value,
                isLeaf: true,
                data: { address: node_addr }
            });

        } else if (type === "group" && id !== parentGroup) {
            // we have a group that is different from the parent group => recursively evaluate.
            const group = state.group[id];
            display_tree.push({
                title: group._props.name.value,
                children: transformStateToDisplayTree(state, group.tree, id),
                data: { address: node_addr }
            });
        }
    }
    return display_tree;
}
