import { createApp } from "vue";
import App from "./App.vue";
import createStore from "common/store/store";
// import { conn, webSocketSyncPlugin } from "./websocket";

const store = createStore();
const app = createApp(App);

app.use(store);

app.mount("#app");
