import Vue from "vue"
import { checkedID } from "../id"

export default {
    namespaced: true,
    state: () => ({}),
    mutations: {
        add_with_id(state, { id, name }) {
            Vue.set(state, id, {
                id,
                _props: {
                    name: {
                        type: "string",
                        value: name,
                        autoUpdate: false,
                        link: false
                    }
                },
                tree: []
            })
        },
        update_property(state, { update, name, id, own } = {}) {
            if (own) {
                state[id]._props[name] = update
            } else {
                state[id].props[name] = update
            }
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