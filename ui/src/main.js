import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import createStore from "common/store/store"
import { conn, webSocketSyncPlugin } from "./websocket"

Vue.config.productionTip = false

new Vue({
  vuetify,
  store: createStore([webSocketSyncPlugin(conn)]),
  render: h => h(App)
}).$mount('#app')
