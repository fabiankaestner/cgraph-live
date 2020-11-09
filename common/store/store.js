import { createStore } from "vuex";

import playback from "./playback";
import instance from "./instance";
import node from "./node";
import local from "./local";
import rundown from "./rundown";
import group from "./group";
import { drop } from "../tree";

export default function _createStore(plugins) {
    return createStore({
        modules: {
            instance,
            node,
            playback,
            local,
            group,
            rundown,
        },
        mutations: {
            drop: drop,
        },
        plugins,
    });
}
