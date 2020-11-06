export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        add(state, { name }) {
            state.push(name)
        },
        update_property(state, { update, name, id, own } = {}) {
            if (own) {
                state[id]._props[name] = update
            } else {
                state[id].props[name] = update
            }
        }
    }
}