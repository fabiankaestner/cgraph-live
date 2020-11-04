<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    {{ address }}
  </v-card>
</template>

<script>
export default {
  name: "Properties",
  computed: {
    address() {
      return this.$store.state.local.properties;
    },
  },
};
</script>

<style>
.v-window {
  flex-grow: 1;
}
.v-tabs {
  flex: 0 0 auto !important;
}
</style>