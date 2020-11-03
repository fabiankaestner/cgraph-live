<template>
  <div>
    <SlTree v-model="tree_data" ref="tree">
      <template slot="title" slot-scope="{ node }">
          <TreeItem :node="node" @expand="expand(node)"/>
      </template>
      <template slot="toggle"><div></div></template>
    </SlTree>
  </div>
</template>

<script>
import SlTree from "sl-vue-tree"
import TreeItem from "./TreeItem"

export default {
  name: "Tree",
  components: {
    SlTree,
    TreeItem
  },
  methods: {
    expand(node) {
      this.$refs.tree.updateNode(node.path, { isExpanded: !node.isExpanded})
    }
  },
  data: () => ({
    tree_data: [
      { title: "Test 1", isLeaf: true },
      { title: "Test 2", isLeaf: true },
      {
        title: "Folder",
        children: [
          { title: "Test 3", isLeaf: true },
          { title: "Test 4", isLeaf: true },
          { title: "Test 5", isLeaf: true },
        ],
      },
      { title: "Test 3", isLeaf: true },
      { title: "Test 4", isLeaf: true },
      { title: "Test 5", isLeaf: true },
      { title: "Test 6", isLeaf: true },
      { title: "Test 7", isLeaf: true },
      { title: "Test 8", isLeaf: true },
      { title: "Test 9", isLeaf: true },
    ],
  }),
};
</script>

<style>
.sl-vue-tree-cursor {
  height: 1px;
  background-color: red;
}
</style>