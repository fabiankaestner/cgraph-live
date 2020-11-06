import Vue from "vue"
import { checkedID } from "../id"

export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        add_with_id(state, { id, name }) {
            Vue.set(state, id, {
                id,
                props: {
                    name: {
                        type: "string",
                        value: name,
                        autoUpdate: false,
                        link: false,
                        own: true
                    }
                },
                tree: []
            })
        },
        update_property(state, { update, name, id } = {}) {
            state[id].props[name] = update
        }
    },
    getters: {
        getPropertyNames: (state) => (id, excludeOwn) => {

            // return array of all property names

            const rundown = state[id]
            if (!rundown) {
                return undefined
            }

            const props = [];

            if (!excludeOwn) {
                for (let name in rundown.props) {
                    props.push(name)
                }
            }
            return props
        },
        evaluate: (state) => (id, property) => {

            // evaluate a property (rundowns don't inherit, so simply return the value)

            const rundown = state[id]
            if (!rundown || !rundown.props[property]) {
                return undefined
            }

            return rundown.props[property]
        }
    },
    actions: {
        add({ commit, state }) {
            const id = checkedID(id => !!state[id])
            commit("add_with_id", {
                id,
                name: `Rundown ${Object.keys(state).length + 1}`
            })
        }
    }
}