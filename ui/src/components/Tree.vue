<template>
  <div>
    <v-list dense nav>
      <SlTree
        v-model="tree_data"
        ref="tree"
        @drop="handleDrop"
        @nodedblclick="handleDblClick"
        @nodeclick="handleClick"
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
  computed: {
    tree_data: {
      get() {
        return this.$props.tree
      },
      set() {}
    }
  },
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
      this.$emit("click", node);
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