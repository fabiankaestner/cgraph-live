import { parseStringAddress } from "../helpers/address"

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
    },
    getters: {
        getPropertyNames: (state, getters, rootState, rootGetters) => (id, excludeOwn) => {
            const node = state[id]
            if (!node) {
                return undefined
            }

            const typeAddress = parseStringAddress(node.props.ref)
            const ownProps = [];
            const props = rootGetters[`${typeAddress.type}/getPropertyNames`](typeAddress.id, true)

            if (!excludeOwn) {
                for (const name in node.props) {
                    if (node.props[name].own) {
                        ownProps.push(name)
                    }
                }
            }
            return [...ownProps, ...props]
        },
        evaluate: (state, getters, rootState, rootGetters) => (id, property) => {

            // evaluate the property
            // if we don't have a value, inherit from the ref

            const node = state[id]
            if (!node) {
                return undefined
            }

            if (node.props[property]) {
                // we have a local value
                return node.props[property]
            }

            // we inherit from the ref
            const address = parseStringAddress(node.props.ref.value)
            return rootGetters[`${address.type}/evaluate`](address.id, property)
        }
    }
}