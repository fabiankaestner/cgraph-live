<template>
  <v-list-item link>
    <TreeSpacer :level="node.level" :expanded="node.isExpanded" :folder="!node.isLeaf" @expand="expand"/>
    {{ node.title }}
  </v-list-item>
</template>

<script>
import TreeSpacer from "./TreeSpacer"

export default {
  name: "TreeItem",
  components: { TreeSpacer },
  methods: {
    expand() { this.$emit("expand") }
  },
  props: ["node"],
};
</script>

<style>
</style>