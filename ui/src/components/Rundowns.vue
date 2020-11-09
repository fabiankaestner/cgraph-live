<template>
    <div>
        <cg-tree
            :elements="tree"
            @click="handleClick"
            @dblclick="handleDblClick"
        />
    </div>
</template>

<script>
import cgTree from "./Tree/Tree";

export default {
    components: {
        cgTree
    },
    computed: {
        tree() {
            const data = [];
            const rundowns = this.$store.state.rundown;
            for (let rundown in rundowns) {
                data.push({
                    title: rundowns[rundown].props.name.value,
                    data: { address: `/rundown/${rundown}` }
                });
            }
            return data;
        }
    },
    methods: {
        handleDblClick(node) {
            this.$store.commit("local/select", { address: node.data.address });
        },
        handleClick(node) {
            this.$store.commit("local/select_properties", {
                address: node.data.address
            });
        },
        add() {
            this.$store.dispatch("rundown/add");
        }
    }
};
</script>

<style></style>
