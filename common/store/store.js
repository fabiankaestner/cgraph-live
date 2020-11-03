import Vue from "vue"
import Vuex from "vuex"

import playbacks from "./playbacks"
import local from "./local"
import rundowns from "./rundowns"
import groups from "./groups"
import { drag } from "../tree"

Vue.use(Vuex)

export default function createStore(plugins) {
    return new Vuex.Store({
        modules: {
            playbacks,
            local,
            groups,
            rundowns
        },
        mutations: {
            drag: drag
        },
        plugins
    })
}