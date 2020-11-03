<template>
  <div>
    <v-list dense nav>
      <SlTree v-model="tree_data" ref="tree">
        <template slot="title" slot-scope="{ node }">
          <TreeItem :node="node" @expand="expand(node)" />
        </template>
        <template slot="toggle"><div></div></template>
      </SlTree>
    </v-list>
  </div>
</template>

<script>
import { transformStateToDisplayTree, getPathFromState } from "common/tree";

import SlTree from "sl-vue-tree";
import TreeItem from "./TreeItem";

export default {
  name: "Tree",
  components: {
    SlTree,
    TreeItem,
  },
  methods: {
    expand(node) {
      this.$refs.tree.updateNode(node.path, { isExpanded: !node.isExpanded });
    },
  },
  computed: {
    tree_data: {
      get() {
        // Transform the vuex state tree into correct tree format for rundown display
        const state = this.$store.state;
        const rundown = getPathFromState(state, ["rundowns", "b1jj8s8zq7"]);

        if (rundown) {
          // recursively go through the tree to display all items & groups
          const test = transformStateToDisplayTree(state, rundown.tree, "");
          console.log(test);
          return test;
        }
        return [];
      },
      set() {},
    },
  },
};
</script>

<style>
.sl-vue-tree-cursor {
  height: 1px;
  background-color: red;
}
</style>