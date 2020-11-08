import Vue from "vue";
import { createStore } from "vuex";

import playback from "./modules/playback";
import instance from "./modules/instance";
import node from "./modules/node";
import local from "./modules/local";
import rundown from "./modules/rundown";
import group from "./modules/group";
import { drop } from "../helpers/tree";

export default function _createStore() {
    return createStore({
        modules: {
            playback,
            instance,
            node,
            local,
            rundown,
            group
        },
        mutations: {
            drop
        }
    });
}
