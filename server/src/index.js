import fs from "fs/promises"
import { fetchPlaybacks } from "./playbacks"

import store from "./store"

async function initStore() {

    // Initialize the store with data read from disk

    try {
        const raw = await fs.readFile("./state.json")
        const data = JSON.parse(raw)
        const playbacks = await fetchPlaybacks()
        store.replaceState({
            ...data,
            playbacks
        })
    } catch (e) {
        console.log("Couldn't initialize store, starting with empty state")
    }
}

initStore()

async function writeState() {

    // Write the state to disk every 5 seconds

    try {
        const str = JSON.stringify(store.state)
        await fs.writeFile("./state.json", str)
    } catch(e) {
        console.error("Error writing state file: ", e)
    }
}

setInterval(writeState, 5000)