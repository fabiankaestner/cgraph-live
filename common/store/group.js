export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        update_property(state, { update, name, id } = {}) {
            state[id].props[name] = update
        }
    }
}