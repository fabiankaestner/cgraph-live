<template>
    <cg-tree
        @drop="handleDrop"
        @click="handleClick"
        :elements="tree_data"
        :address="`/rundown/${address}`"
    />
</template>

<script>
import cgTree from "./Tree/Tree";

import { transformStateToDisplayTree } from "common/helpers/display_tree";
import { getPathFromState } from "common/helpers/getters";
import { containsPath } from "common/helpers/path";

export default {
    name: "Rundown",
    props: ["address"],
    components: {
        cgTree
    },
    methods: {
        handleDrop(payload) {
            payload.rundown = this.$props.address;
            this.$store.commit("drop", payload);
        },
        handleClick(node) {
            this.$store.commit("local/select_properties", {
                address: node.data.address
            });
            if (node.keys.ctrl) {
                if (
                    containsPath(
                        this.$store.state.local.treeSelections[
                            `/rundown/${this.$props.address}`
                        ].map(o => o.path),
                        node.path
                    )
                ) {
                    console.log("herer");
                    this.$store.commit("local/deselect_tree", {
                        address: `/rundown/${this.$props.address}`,
                        selectedPath: node.path
                    });
                } else {
                    this.$store.commit("local/select_tree_add", {
                        address: `/rundown/${this.$props.address}`,
                        selectedPath: node.path,
                        selectedAddress: node.data.address
                    });
                }
            } else {
                this.$store.commit("local/select_tree", {
                    address: `/rundown/${this.$props.address}`,
                    selectedPath: node.path,
                    selectedAddress: node.data.address
                });
            }
        }
    },
    computed: {
        tree_data() {
            // Transform the vuex state tree into correct tree format for rundown display
            const state = this.$store.state;
            const rundown = getPathFromState(state, [
                "rundown",
                this.$props.address
            ]);

            if (rundown) {
                return transformStateToDisplayTree(
                    state,
                    rundown.tree,
                    this.$store.state.local.treeSelections[
                        `/rundown/${this.$props.address}`
                    ]
                );
            }
            return [];
        }
    }
};
</script>

<style></style>
