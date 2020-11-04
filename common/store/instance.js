export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        add(state, { name }) {
            state.push(name)
        }
    }
}