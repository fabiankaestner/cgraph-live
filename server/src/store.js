import store from "common/store/store";
import { createStore } from "vuex";
import { webSocketSyncPlugin, manager } from "./websocket";

export default createStore({
    ...store,
    plugins: [webSocketSyncPlugin(manager), Vuex.createLogger()],
});
