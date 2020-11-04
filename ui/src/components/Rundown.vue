<template>
  <Tree 
    @drop="handleDrop"
    :tree="tree_data"
  />
</template>

<script>
import Tree from "./Tree";

import { transformStateToDisplayTree, getPathFromState } from "common/tree";

export default {
  name: "Rundown",
  props: ["address"],
  components: {
    Tree,
  },
  methods: {
    handleDrop(payload) {
      payload.rundown = this.$props.address
      this.$store.commit("drop", payload)
    }
  },
  computed: {
    tree_data() {
      // Transform the vuex state tree into correct tree format for rundown display
      const state = this.$store.state;
      const rundown = getPathFromState(state, ["rundowns", this.$props.address]);

      if (rundown) {
        return transformStateToDisplayTree(state, rundown.tree, "");
      }
      return [];
    },
  },
};
</script>

<style>
</style>