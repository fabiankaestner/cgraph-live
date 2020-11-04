<template>
  <div>
    <v-list dense nav>
      <SlTree
        v-model="tree"
        ref="tree"
        @drop="handleDrop"
        @dblclick="handleDblClick"
        @click="handleClick"
      >
        <template slot="title" slot-scope="{ node }">
          <TreeItem :node="node" @expand="expand(node)" />
        </template>
        <template slot="toggle"><div></div></template>
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
    TreeItem,
  },
  props: ["tree"],
  methods: {
    expand(node) {
      this.$refs.tree.updateNode(node.path, { isExpanded: !node.isExpanded });
    },
    handleDrop(dragged, { node, placement }) {
      this.$emit("drop", {
        dragged,
        target: node,
        placement,
      });
    },
    handleDblClick(node) {
      this.$emit("dblclick", node);
    },
    handleClick(node) {
      this.$emit("dblclick", node);
    },
  },
};
</script>

<style>
.sl-vue-tree-cursor {
  height: 1px;
  background-color: blue;
}
</style>