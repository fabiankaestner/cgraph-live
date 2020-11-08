import { parseStringAddress } from "../../helpers/address";
import { StringAddress } from "../types/address";
import { Properties, PropertyUpdate } from "../types/properties";
import { State } from "../types/state";

export interface Instance {
    id: string;
    type: StringAddress;
    props: Properties;
}

export interface InstanceState {
    [key: string]: Instance;
}

const state: InstanceState = {};

const mutations = {
    update_property(
        state: InstanceState,
        { update, name, id }: PropertyUpdate
    ) {
        state[id].props[name] = update;
    }
};

const getters = {
    getPropertyNames: (
        state: InstanceState,
        getters: any,
        rootState: State,
        rootGetters: any
    ) => (id: string, excludeOwn: boolean) => {
        // return array of all property names, optionally excluding own properties

        const instance = state[id];
        if (!instance) {
            return undefined;
        }

        const typeAddress = parseStringAddress(instance.type);
        if (!typeAddress) {
            return undefined;
        }

        const ownProps: string[] = [];
        const props = rootGetters[`${typeAddress.type}/getPropertyNames`](
            typeAddress.id,
            true
        );

        if (!excludeOwn) {
            for (const name in instance.props) {
                if (instance.props[name].own) {
                    ownProps.push(name);
                }
            }
        }
        return [...ownProps, ...props];
    },
    evaluate: (
        state: InstanceState,
        getters: any,
        rootState: State,
        rootGetters: any
    ) => (id: string, property: string) => {
        // evaluate the property
        // if we don't have a value, inherit from the type object

        const instance = state[id];
        if (!instance) {
            return undefined;
        }

        if (instance.props[property]) {
            // we have a local value
            return instance.props[property];
        }

        // we inherit from the type
        const address = parseStringAddress(instance.type);
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
