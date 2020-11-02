import Vue from "vue"
import Vuex from "vuex"

import graphics from "./graphics"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        graphics
    }
})

export default store