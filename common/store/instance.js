import { parseStringAddress } from "../helpers/address";

export default {
    namespaced: true,
    state: () => ({}),
    mutations: {

    },
    getters: {
        getPropertyNames: (state, getters, rootState, rootGetters) => (id, excludeOwn) => {
            
            // return array of all property names, optionally excluding own properties

            const instance = state[id]
            if (!instance) {
                return undefined
            }

            const typeAddress = parseStringAddress(instance.type)
            const ownProps = [];
            const props = rootGetters[`${typeAddress.type}/getPropertyNames`](typeAddress.id, true)

            if (!excludeOwn) {
                for (const name in instance.props) {
                    if (instance.props[name].own) {
                        ownProps.push(name)
                    }
                }
            }
            return [...ownProps, ...props]
        },
        evaluate: (state, getters, rootState, rootGetters) => (id, property) => {

            // evaluate the property
            // if we don't have a value, inherit from the type object

            const instance = state[id]
            if (!instance) {
                return undefined
            }

            if (instance.props[property]) {
                // we have a local value
                return instance.props[property]
            }

            // we inherit from the type
            const address = parseStringAddress(instance.type)
            return rootGetters[`${address.type}/evaluate`](address.id, property)
        }
    }
}