export const conn = new WebSocket("ws://localhost:8000");

conn.addEventListener("open", () => {
    console.log("Connected");
    conn.send("Ping");
});

conn.addEventListener("error", error => {
    console.error("Websocket Error: ", error);
});

conn.addEventListener("message", msg => {
    console.log("Websocket Message: ", msg);
});

export function webSocketSyncPlugin(connection) {
    return store => {
        connection.addEventListener("message", ({ data }) => {
            const msg = JSON.parse(data);
            if (msg.msgType === "MUTATION") {
                store.commit(msg.type, msg.payload);
            } else if (msg.msgType === "REPLACE_STATE") {
                store.replaceState(msg.payload);
            }
        });
        store.subscribe(({ type, payload }) => {
            const msg = {
                msgType: "MUTATION",
                type,
                payload
            };
            if (!payload.src) {
                connection.send(JSON.stringify(msg));
            }
        });
    };
}
