export default {
    namespaced: true,
    state: () => ([]),
    mutations: {
        add(state) {
            state.push("New Rundown")
        }
    }
}