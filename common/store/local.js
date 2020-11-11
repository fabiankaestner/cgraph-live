import { comparePath } from "../helpers/path";

export default {
    namespaced: true,
    state: () => ({
        currentlySelected: "",
        selected: [],
        properties: "",
        treeSelections: {},
    }),
    mutations: {
        select(state, { address }) {
            state.currentlySelected = address;
            if (state.selected.indexOf(address) === -1) {
                state.selected.push(address);
            }
        },
        select_tab(state, { address }) {
            state.currentlySelected = address;
        },
        select_properties(state, { address }) {
            state.properties = address;
        },
        select_tree_add(state, { address, selectedPath, selectedAddress }) {
            if (state.treeSelections[address]) {
                state.treeSelections[address].push({
                    path: selectedPath,
                    address: selectedAddress,
                });
            } else {
                state.treeSelections[address] = [
                    { path: selectedPath, address: selectedAddress },
                ];
            }
        },
        select_tree(state, { address, selectedPath, selectedAddress }) {
            state.treeSelections[address] = [
                { path: selectedPath, address: selectedAddress },
            ];
        },
        deselect_tree(state, { address, selectedPath }) {
            if (selectedPath) {
                state.treeSelections[address] = state.treeSelections[
                    address
                ].filter(({ path }) => !comparePath(path, selectedPath));
            } else {
                state.treeSelections[address] = undefined;
            }
        },
        deselect(state, { address }) {
            const idx = state.selected.indexOf(address);
            if (idx !== -1) {
                state.selected.splice(idx, 1);
            }
        },
    },
    getters: {
        currentlySelectedIdx(state) {
            return state.selected.indexOf(state.currentlySelected);
        },
    },
};
