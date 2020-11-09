import { createApp } from "vue";
import { createStore } from "vuex";

import App from "./App.vue";
import store from "common/store/store";
import { conn, webSocketSyncPlugin } from "./websocket";

const app = createApp(App);

app.use(
    createStore({
        ...store,
        plugins: [webSocketSyncPlugin(conn)]
    })
);

app.mount("#app");
