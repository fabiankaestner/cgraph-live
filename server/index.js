import WebSocket from "ws"

const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", ws => {
    ws.on("message", incoming => {
        console.log(incoming)
    })

    ws.send("hello")
})

