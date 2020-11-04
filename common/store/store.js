import Vue from "vue"
import Vuex from "vuex"

import playback from "./playback"
import instance from "./instance"
import node from "./node"
import local from "./local"
import rundown from "./rundown"
import group from "./group"
import { drop } from "../tree"

Vue.use(Vuex)

export default function createStore(plugins) {
    return new Vuex.Store({
        modules: {
            instance,
            node,
            playback,
            local,
            group,
            rundown
        },
        mutations: {
            drop: drop
        },
        plugins
    })
}