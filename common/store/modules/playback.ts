import { Properties, PropertyUpdate } from "../types/properties";

export interface Playback {
    id: string;
    props: Properties;
}

export interface PlaybackState {
    [key: string]: Playback;
}

const state: PlaybackState = {};

const mutations = {
    update_property(
        state: PlaybackState,
        { update, name, id }: PropertyUpdate
    ) {
        state[id].props[name] = update;
    }
};

const getters = {
    getPropertyNames: (state: PlaybackState) => (
        id: string,
        excludeOwn: boolean
    ) => {
        // return array of all property names

        const pb = state[id];
        if (!pb) {
            return undefined;
        }

        const ownProps = [];
        const props = [];

        for (const name in pb.props) {
            const prop = pb.props[name];
            if (prop.own && !excludeOwn) {
                ownProps.push(name);
            } else if (!prop.own) {
                props.push(name);
            }
        }
        return [...ownProps, ...props];
    },
    evaluate: (state: PlaybackState) => (id: string, property: string) => {
        // evaluate a property (playbacks don't inherit, so simply return the value)

        const pb = state[id];
        if (!pb || !pb.props[property]) {
            return undefined;
        }

        return pb.props[property];
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};
