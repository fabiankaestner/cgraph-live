import { createApp } from "vue";
import App from "./App.vue";
import createStore from "common/store/store";
import { conn, webSocketSyncPlugin } from "./websocket";

const app = createApp(App);

app.use(createStore([webSocketSyncPlugin(conn)]));

app.mount("#app");
