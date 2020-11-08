import { StringAddress } from "../types/address";

export interface LocalState {
    currentlySelected: StringAddress;
    selected: StringAddress[];
    properties: StringAddress;
}

const state: LocalState = {
    currentlySelected: "",
    selected: [],
    properties: ""
};

const mutations = {
    select(state: LocalState, { address }: { address: StringAddress }) {
        state.currentlySelected = address;
        if (state.selected.indexOf(address) === -1) {
            state.selected.push(address);
        }
    },
    select_tab(state: LocalState, { address }: { address: StringAddress }) {
        state.currentlySelected = address;
    },
    select_properties(
        state: LocalState,
        { address }: { address: StringAddress }
    ) {
        state.properties = address;
    },
    deselect(state: LocalState, { address }: { address: StringAddress }) {
        const idx = state.selected.indexOf(address);
        if (idx !== -1) {
            state.selected.splice(idx, 1);
        }
    }
};

const getters = {
    currentlySelectedIdx(state: LocalState) {
        return state.selected.indexOf(state.currentlySelected);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};
