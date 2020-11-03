<template>
  <v-list-item :key="node.title" link>
    {{ node.title }}
  </v-list-item>
</template>

<script>
export default {
  name: "TreeItem",
  components: {},
  data: () => ({}),
};
</script>

<style>
</style>