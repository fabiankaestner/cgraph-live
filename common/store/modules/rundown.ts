import Vue from "vue";
import { checkedID } from "../../id";
import { Properties, PropertyUpdate } from "../types/properties";
import { StateTree } from "../types/stateTree";

export interface Rundown {
    id: string;
    props: Properties;
    tree: StateTree;
}

export interface RundownState {
    [key: string]: Rundown;
}

const state: RundownState = {};

const mutations = {
    add_with_id(
        state: RundownState,
        { id, name }: { id: string; name: string }
    ) {
        state[id] = {
            id,
            props: {
                name: {
                    type: "string",
                    name: "name",
                    value: name,
                    autoUpdate: false,
                    link: false,
                    own: true
                }
            },
            tree: []
        };
    },
    update_property(state: RundownState, { update, name, id }: PropertyUpdate) {
        state[id].props[name] = update;
    }
};

const actions = {
    add({ commit, state }: any) {
        const id = checkedID(id => !!state[id]);
        commit("add_with_id", {
            id,
            name: `Rundown ${Object.keys(state).length + 1}`
        });
    }
};

const getters = {
    getPropertyNames: (state: RundownState) => (
        id: string,
        excludeOwn: boolean
    ) => {
        // return array of all property names

        const rundown = state[id];
        if (!rundown) {
            return undefined;
        }

        const props: string[] = [];

        if (!excludeOwn) {
            for (let name in rundown.props) {
                props.push(name);
            }
        }
        return props;
    },
    evaluate: (state: RundownState) => (id: string, property: string) => {
        // evaluate a property (rundowns don't inherit, so simply return the value)

        const rundown = state[id];
        if (!rundown || !rundown.props[property]) {
            return undefined;
        }

        return rundown.props[property];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
