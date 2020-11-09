import playback from "./playback";
import instance from "./instance";
import node from "./node";
import local from "./local";
import rundown from "./rundown";
import group from "./group";
import { drop } from "../tree";

export default {
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
};
