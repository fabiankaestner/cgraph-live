import Vue from "vue";
import App from "./App.vue";
import createStore from "common/store/store";
import { conn, webSocketSyncPlugin } from "./websocket";

Vue.config.productionTip = false;

const store = createStore()

new Vue({
    store: createStore([webSocketSyncPlugin(conn)]),
    render: h => h(App)
}).$mount("#app");
