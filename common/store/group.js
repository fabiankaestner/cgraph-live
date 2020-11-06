export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        update_property(state, { update, name, id } = {}) {
            state[id].props[name] = update
        }
    },
    getters: {
        getPropertyNames: (state) => (id, excludeOwn) => {

            // return array of all property names

            const group = state[id]
            if (!group) {
                return undefined
            }

            const props = [];

            if (!excludeOwn) {
                for (let name in group.props) {
                    props.push(name)
                }
            }
            return props
        },
        evaluate: (state) => (id, property) => {

            // evaluate a property (groups don't inherit, so simply return the value)

            const group = state[id]
            if (!group || !group.props[property]) {
                return undefined
            }

            return group.props[property]
        }

    }
}