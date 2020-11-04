<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    <v-card-title class="headline">{{ item.name }}</v-card-title>
    <v-card-subtitle>{{ address }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-container>
      <v-list>
        <v-subheader>Node Properties</v-subheader>
        <StringProperty  />
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
import { getStrAddressFromState } from "common/tree";

export default {
  name: "Properties",
  computed: {
    address() {
      return this.$store.state.local.properties;
    },
    item() {
      if (this.address) {
        return getStrAddressFromState(this.$store.state, this.address);
      }
      return {};
    },
  },
};
</script>

<style scoped>
.v-window {
  flex-grow: 1;
}
.v-tabs {
  flex: 0 0 auto !important;
}
</style>