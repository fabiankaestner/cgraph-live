export default {
    namespaced: true,
    state: () => ({ currentlySelected: "", selected: [], properties: "" }),
    mutations: {
        select(state, { address }) {
            state.currentlySelected = address
            if (state.selected.indexOf(address) === -1) {
                state.selected.push(address)
            }
        },
        select_tab(state, { address }) {
            state.currentlySelected = address
        },
        select_properties(state, { address }) {
            state.properties = address
        },
        deselect(state, { address }) {
            const idx = state.selected.indexOf(address)
            if (idx !== -1) {
                state.selected.splice(idx, 1)
            }
        }
    },
    getters: {
        currentlySelectedIdx(state) {
            return state.selected.indexOf(state.currentlySelected)
        }
    }
}