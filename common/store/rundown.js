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