import Vue from "vue"
import Vuex from "vuex"

import playbacks from "./playbacks"
import local from "./local"

Vue.use(Vuex)

export default function createStore(plugins) {
    return new Vuex.Store({
        modules: {
            playbacks,
            local
        },
        plugins
    })
}