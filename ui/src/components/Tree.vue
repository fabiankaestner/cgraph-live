<template>
    <div>
        <v-list dense nav>
            <SlTree
                v-model="tree_data"
                ref="tree"
                @drop="handleDrop"
                @nodedblclick="handleDblClick"
                @nodeclick="handleClick"
                @externaldrop="external"
                @beforedrop="beforeDrop"
            >
                <template v-slot:title="{ node }">
                    <TreeItem :node="node" @expand="expand(node)" />
                </template>
                <template v-slot:toggle><div></div></template>
            </SlTree>
        </v-list>
    </div>
</template>

<script>
import SlTree from "sl-vue-tree";
import TreeItem from "./TreeItem";

export default {
    name: "Tree",
    components: {
        SlTree,
        TreeItem
    },
    props: ["tree"],
    computed: {
        tree_data: {
            get() {
                return this.$props.tree;
            },
            set() {}
        }
    },
    methods: {
        expand(node) {
            this.$refs.tree.updateNode(node.path, {
                isExpanded: !node.isExpanded
            });
        },
        beforeDrop(nodes, position, cancel) {
            this.$emit("beforedrop", { nodes, position, cancel });
        },
        handleDrop(dragged, { node, placement }) {
            this.$emit("drop", {
                dragged,
                target: node,
                placement
            });
        },
        handleDblClick(node) {
            this.$emit("dblclick", node);
        },
        handleClick(node) {
            this.$emit("click", node);
        },
        external(path, event) {
            console.log(path, event);
            this.$emit("external", { path, event });
        }
    }
};
</script>

<style>
.sl-vue-tree-cursor {
    height: 3px;
    background-color: #1976d2;
}
</style>
