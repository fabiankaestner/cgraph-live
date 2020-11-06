export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        update_property(state, { update, name, id, own } = {}) {
            if (own) {
                state[id]._props[name] = update
            } else {
                state[id].props[name] = update
            }
        }
    }
}