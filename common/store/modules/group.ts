import { Properties, PropertyUpdate } from "../types/properties";
import { StateTree } from "../types/stateTree";

export interface Group {
    id: string;
    props: Properties;
    tree: StateTree;
}

export interface GroupState {
    [key: string]: Group;
}

const state: GroupState = {};

const mutations = {
    update_property(state: GroupState, { update, name, id }: PropertyUpdate) {
        state[id].props[name] = update;
    }
};

const getters = {
    getPropertyNames: (state: GroupState) => (
        id: string,
        excludeOwn: boolean
    ) => {
        // return array of all property names

        const group = state[id];
        if (!group) {
            return undefined;
        }

        const props: string[] = [];

        if (!excludeOwn) {
            for (let name in group.props) {
                props.push(name);
            }
        }
        return props;
    },
    evaluate: (state: GroupState) => (id: string, property: string) => {
        // evaluate a property (groups don't inherit, so simply return the value)

        const group = state[id];
        if (!group || !group.props[property]) {
            return undefined;
        }

        return group.props[property];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};
