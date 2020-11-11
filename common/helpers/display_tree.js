import { parseStringAddress } from "./address";

export function transformStateToDisplayTree(state, tree, selected = []) {
    const display_tree = transformSubtree(state, tree, "");

    for (let i = 0; i < selected.length; i++) {
        let current = { children: display_tree };
        for (let pathEl of selected[i].path) {
            current = current.children[pathEl];
        }
        current.selected = true;
    }

    return display_tree;
}

function transformSubtree(state, tree, parentGroup) {
    const subtree = [];

    for (let node_addr of tree) {
        const { type, id } = parseStringAddress(node_addr);

        if (type === "node") {
            // we have a leaf node

            subtree.push({
                title: state.node[id].props.name.value,
                data: { address: node_addr },
            });
        } else if (type === "group" && id !== parentGroup) {
            // we have a group that is different from the parent group => recursively evaluate.
            const group = state.group[id];
            subtree.push({
                title: group.props.name.value,
                children: transformSubtree(state, group.tree, id),
                expanded: group.expanded,
                data: { address: node_addr },
            });
        }
    }

    return subtree;
}
