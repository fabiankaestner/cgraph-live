import EventEmitter from "events"
import WebSocket from "ws"

import { checkedID } from "common/id"

import store from "./store"

export class ConnectionManager extends EventEmitter {

    // Manage all connections to the websocket server

    constructor(wss) {
        super()
        this.connections = {}
        if (wss) {

            // If we get a websocket server, register all new connections

            this.wss = wss
            wss.on("connection", conn => this.register(conn))
        }
    }

    register(connection) {

        // Registers a new connection to the Manager.
        // If websocket server is provided to constructor, this method is automatically
        // called for every connection

        const id = checkedID(id => !!this.connections[id])
        this.connections[id] = connection
        connection.on("message", msg => this.handleMessage(id, msg))

        const initialState = JSON.stringify({
            msgType: "REPLACE_STATE",
            payload: store.state
        })
        connection.send(initialState)
    }

    handleMessage(src, msg) {

        // Handle incoming messages from any client

        console.log(`<${src}> message : ${msg}`)
        try {
            // Add src property to message object to identify the source connection
            const msgObj = {
                ...JSON.parse(msg),
                src
            }
            this.emit("message", msgObj)
        } catch (e) {
            console.error("Error parsing message: ", msg);
        }
    }

    send(msg, exclude) {

        // Sends a message to all connected clients whose ID doesn't match the exclude argument

        for (let id in this.connections) {
            if (id !== exclude) {
                this.connections[id].send(msg)
            }
        }
    }
}

// Create default Websocket server and connection manager
export const wss = new WebSocket.Server({ port: 8000 })

export const manager = new ConnectionManager(wss)

export function webSocketSyncPlugin(manager) {

    // Vuex plugin to sync the state across the network

    return store => {
        manager.on("message", ({ msgType, type, payload, src }) => {
            if (msgType === "MUTATION") {
                store.commit(type, { ...payload, src})
            }
        })
        store.subscribe(({ type, payload }) => {
            const msg = {
                type,
                payload,
                msgType: "MUTATION"
            }
            manager.send(JSON.stringify(msg), payload.src)
        })
    }
}
