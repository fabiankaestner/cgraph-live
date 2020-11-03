<template>
  <v-list-item-icon :style="`width: ${level * 20}px`" @click.stop="expand">
    <template v-if="folder">
      <v-icon v-if="expanded">mdi-chevron-down</v-icon>
      <v-icon v-else>mdi-chevron-right</v-icon>
    </template>
  </v-list-item-icon>
</template>

<script>
export default {
  name: "TreeSpacer",
  props: ["level", "expanded", "folder"],
  methods: {
    expand() {
      this.$emit("expand");
    },
  },
};
</script>

<style>
.v-icon {
  right: 7px;
}
.v-list-item__icon {
    margin-right: 0px !important;
}
</style>