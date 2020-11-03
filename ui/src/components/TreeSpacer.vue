<template>
  <div :style="`width: ${level * 20}px`" @click="expand">
    <template v-if="folder">
      <v-icon v-if="expanded">mdi-chevron-down</v-icon>
      <v-icon v-else>mdi-chevron-right</v-icon>
    </template>
  </div>
</template>

<script>
export default {
  name: "TreeSpacer",
  props: ["level", "expanded", "folder"],
  methods: {
      expand() { this.$emit("expand") }
  }
};
</script>

<style>
.v-icon {
  right: 7px;
}
</style>