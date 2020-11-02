const conn = new WebSocket("ws://localhost:8000")

conn.onopen = () => {
    console.log("Connected")
    conn.send("Ping")
}

conn.onerror = error => {
    console.error("Websocket Error: ", error)
}

conn.onmessage = msg => {
    console.log("Websocket Message: ", msg)
}