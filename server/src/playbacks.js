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
                    name: "Debug Instance 1"
                },
                "35scjas0qm": {
                    name: "Debug Instance 2"
                },
                "35sfe6v0qm": {
                    name: "Debug Instance 3"
                },
                "35scjrt0qm": {
                    name: "Debug Instance 4"
                },
                "35asdf0qma": {
                    name: "Debug Instance 5"
                },
                "35sjkloimx": {
                    name: "Debug Instance 6"
                },
                "1234j6v0qm": {
                    name: "Debug Instance 7"
                }
            }
        }
    }
    return playbacks
}