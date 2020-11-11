import { checkedID } from "common/id";
import fs from "fs/promises";
import { fetchPlaybacks } from "./playbacks";

import store from "./store";

const initial = {
    playback: {
        debug: {
            id: "debug",
            props: {
                name: {
                    type: "string",
                    name: "name",
                    value: "Debug Playback",
                    autoUpdate: false,
                    link: false,
                    own: true,
                },
                data: {
                    type: "string",
                    name: "data",
                    value: null,
                    autoUpdate: false,
                    link: false,
                },
            },
            triggers: {
                testTrigger: {
                    name: "Test Trigger",
                },
            },
            tree: ["/instance/35scj6v0qm"],
        },
    },
    instance: {
        "35scj6v0qm": {
            id: "35scj6v0qm",
            type: "/playback/debug",
            props: {
                name: {
                    type: "string",
                    name: "name",
                    value: "Debug Playback Instance 1",
                    autoUpdate: false,
                    link: false,
                    own: true,
                },
            },
        },
    },
    node: {
        "1234j6v0qm": {
            id: "1234j6v0qm",
            type: "/playback/debug",
            props: {
                name: {
                    type: "string",
                    name: "name",
                    value: "Debug Playback Node",
                    autoUpdate: false,
                    link: false,
                    own: true,
                },
                ref: {
                    type: "reference",
                    name: "ref",
                    value: "/instance/35scj6v0qm",
                    autoUpdate: false,
                    link: false,
                    own: true,
                },
            },
        },
    },
    group: {
        "5r2g4v8vv1": {
            id: "5r2g4v8vv1",
            expanded: true,
            props: {
                name: {
                    type: "string",
                    name: "name",
                    value: "Group 1",
                    autoUpdate: false,
                    link: false,
                    own: true,
                },
            },
            tree: ["/node/1234j6v0qm"],
        },
    },
    rundown: {
        b1jj8s8zq7: {
            id: "b1jj8s8zq7",
            props: {
                name: {
                    type: "string",
                    name: "name",
                    value: "Rundown 1",
                    autoUpdate: false,
                    link: false,
                    own: true,
                },
            },
            tree: ["/group/5r2g4v8vv1"],
        },
    },
    local: {
        currentlySelected: "",
        selected: [],
        properties: "",
        treeSelections: {},
    },
};

async function initStore() {
    // Initialize the store with data read from disk

    try {
        const raw = await fs.readFile("./state.json");
        const data = JSON.parse(raw);
        const playbacks = await fetchPlaybacks();
        initial.group = {};
        initial.node = {};

        const _tree = [];

        for (let i = 0; i < 10; i++) {
            const tree = [];
            for (let j = 0; j < 10; j++) {
                const id = checkedID((id) => !!initial.node[id]);
                initial.node[id] = {
                    id: "1234j6v0qm",
                    type: "/playback/debug",
                    props: {
                        name: {
                            type: "string",
                            name: "name",
                            value: `Debug Playback Node ${i}/${j}`,
                            autoUpdate: false,
                            link: false,
                            own: true,
                        },
                        ref: {
                            type: "reference",
                            name: "ref",
                            value: "/instance/35scj6v0qm",
                            autoUpdate: false,
                            link: false,
                            own: true,
                        },
                    },
                };
                tree.push(`/node/${id}`);
            }
            const id = checkedID((id) => !!initial.group[id]);
            initial.group[id] = {
                id,
                expanded: true,
                props: {
                    name: {
                        type: "string",
                        name: "name",
                        value: `Group ${i}`,
                        autoUpdate: false,
                        link: false,
                        own: true,
                    },
                },
                tree,
            };
            _tree.push(`/group/${id}`);
        }
        initial.rundown.b1jj8s8zq7.tree = _tree;
        store.replaceState(initial);
    } catch (e) {
        console.log("Couldn't initialize store, starting with empty state");
    }
}

initStore();

async function writeState() {
    // Write the state to disk every 5 seconds

    try {
        const str = JSON.stringify(store.state);
        await fs.writeFile("./state.json", str);
    } catch (e) {
        console.error("Error writing state file: ", e);
    }
}

setInterval(writeState, 5000);
