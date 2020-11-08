<template>
    <Tree @drop="handleDrop" @click="handleClick" :tree="tree_data" />
</template>

<script>
import Tree from "./Tree";

import { transformStateToDisplayTree } from "common/helpers/display_tree";
import { getPathFromState } from "common/helpers/getters";

export default {
    name: "Rundown",
    props: ["address"],
    components: {
        Tree
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
                return transformStateToDisplayTree(state, rundown.tree, "");
            }
            return [];
        }
    }
};
</script>

<style></style>
