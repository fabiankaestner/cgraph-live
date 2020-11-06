export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        add(state, { name }) {
            state.push(name)
        },
        update_property(state, { update, name, id } = {}) {
            state[id].props[name] = update
        }
    },
    getters: {
        getPropertyNames: (state) => (id, excludeOwn) => {

            // return array of all property names

            const pb = state[id]
            if (!pb) {
                return undefined
            }

            const ownProps = [];
            const props = [];

            for (const name in pb.props) {
                const prop = pb.props[name]
                if (prop.own && !excludeOwn) {
                    ownProps.push(name)
                } else {
                    props.push(name)
                }
            }
            return [...ownProps, ...props]
        },
        evaluate: (state) => (id, property) => {

            // evaluate a property (playbacks don't inherit, so simply return the value)

            const pb = state[id]
            if (!pb || !pb.props[property]) {
                return undefined
            }

            return pb.props[property]
        }
    }
}