import fs from "fs/promises"
import { fetchPlaybacks } from "./playbacks"

import store from "./store"

const initial = {
    playback: {
        debug: {
            id: "debug",
            _props: {
                name: {
                    type: "string",
                    value: "Debug Playback",
                    autoUpdate: false,
                    link: false
                }
            },
            props: {
                data: {
                    type: "string",
                    autoUpdate: false,
                    link: false
                }
            },
            triggers: {
                testTrigger: {
                    "name": "Test Trigger"
                }
            },
            tree: [
                "/instance/35scj6v0qm"
            ]
        }
    },
    instance: {
        "35scj6v0qm": {
            id: "35scj6v0qm",
            type: "/playback/debug",
            _props: {
                name: {
                    type: "string",
                    value: "Debug Playback Instance 1",
                    autoUpdate: false,
                    link: false
                }
            },
            props: {}
        }
    },
    node: {
        "1234j6v0qm": {
            id: "1234j6v0qm",
            type: "/playback/debug",
            _props: {
                name: {
                    type: "string",
                    value: "Debug Playback Node",
                    autoUpdate: false,
                    link: false
                },
                ref: {
                    type: "reference",
                    value: "/instance/35scj6v0qm",
                    autoUpdate: false,
                    link: false
                }
            }
        }
    },
    group: {
        "5r2g4v8vv1": {
            id: "5r2g4v8vv1",
            _props: {
                name: {
                    type: "string",
                    value: "Group 1",
                    autoUpdate: false,
                    link: false
                }
            },
            tree: [
                "/node/35scj6v0qm"
            ]
        }
    },
    rundown: {
        "b1jj8s8zq7": {
            id: "b1jj8s8zq7",
            _props: {
                name: {
                    type: "string",
                    value: "Rundown 1",
                    autoUpdate: false,
                    link: false
                }
            },
            tree: [
                "/group/5r2g4v8vv1"
            ]
        }
    }
}

async function initStore() {

    // Initialize the store with data read from disk

    try {
        const raw = await fs.readFile("./state.json")
        const data = JSON.parse(raw)
        const playbacks = await fetchPlaybacks()
        store.replaceState(initial)
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