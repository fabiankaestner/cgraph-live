import createStore from "common/store/store"
import Vuex from "vuex"
import { webSocketSyncPlugin, manager } from "./websocket"

export default createStore([
    webSocketSyncPlugin(manager),
    Vuex.createLogger()
])
