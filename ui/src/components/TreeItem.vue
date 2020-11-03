<template>
  <v-list-item link :class="node.isSelected ? 'v-list-item--active' : ''">
    <TreeSpacer
      :level="node.level"
      :expanded="node.isExpanded"
      :folder="!node.isLeaf"
      @expand="expand"
    />
    <v-list-item-content>
      <v-list-item-title v-text="node.title"> </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import TreeSpacer from "./TreeSpacer";

export default {
  name: "TreeItem",
  components: { TreeSpacer },
  methods: {
    expand() {
      this.$emit("expand");
    },
  },
  props: ["node"],
};
</script>

<style>
</style>