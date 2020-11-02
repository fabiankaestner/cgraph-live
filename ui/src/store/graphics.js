export default {
    namespaced: true,
    state: () => (["test", "test2", "test3"]),
    mutations: {
        add(state, name) {
            state.push(name)
        }
    }
}