import { parseStringAddress } from "../../helpers/address";
import { StringAddress } from "../types/address";
import { Properties, PropertyUpdate } from "../types/properties";
import { State } from "../types/state";
import { StateTree } from "../types/stateTree";

export interface Node {
    id: string;
    type: StringAddress;
    props: Properties;
    tree: StateTree;
}

export interface NodeState {
    [key: string]: Node;
}

const state: NodeState = {};

const mutations = {
    update_property(state: NodeState, { update, name, id }: PropertyUpdate) {
        state[id].props[name] = update;
    }
};

const getters = {
    getPropertyNames: (
        state: NodeState,
        getters: any,
        rootState: State,
        rootGetters: any
    ) => (id: string, excludeOwn: boolean) => {
        const node = state[id];
        if (!node) {
            return undefined;
        }

        const typeAddress = parseStringAddress(node.props.ref.value);
        if (!typeAddress) {
            return undefined;
        }

        const ownProps: string[] = [];
        const props = rootGetters[`${typeAddress.type}/getPropertyNames`](
            typeAddress.id,
            true
        );

        if (!excludeOwn) {
            for (const name in node.props) {
                if (node.props[name].own) {
                    ownProps.push(name);
                }
            }
        }
        return [...ownProps, ...props];
    },
    evaluate: (
        state: NodeState,
        getters: any,
        rootState: State,
        rootGetters: any
    ) => (id: string, property: string) => {
        // evaluate the property
        // if we don't have a value, inherit from the ref

        const node = state[id];
        if (!node) {
            return undefined;
        }

        if (node.props[property]) {
            // we have a local value
            return node.props[property];
        }

        // we inherit from the ref
        const address = parseStringAddress(node.props.ref.value);
        if (!address) {
            return undefined;
        }

        return rootGetters[`${address.type}/evaluate`](address.id, property);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};
