export async function fetchPlaybacks() {
    const playbacks = {
        debug: {
            name: "Debug Playback",
            properties: {
                test: {
                    type: "STRING",
                    default: "",
                    autoUpdate: false
                }
            },
            instances: {
                "35scj6v0qm": {
                    name: "Debug Instance"
                }
            }
        }
    }
    return playbacks
}