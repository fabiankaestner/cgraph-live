import store from "common/store/store";
import Vuex from "vuex";
import { webSocketSyncPlugin, manager } from "./websocket";

export default Vuex.createStore({
    ...store,
    plugins: [webSocketSyncPlugin(manager), Vuex.createLogger()],
});
