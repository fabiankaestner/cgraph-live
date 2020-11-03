<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    <v-tabs
      v-model="tab"
      color="primary"
      dark
      slider-color="primary"
      fixed-tabs
    >
      <v-tab>Rundown</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="Rundown">
        <Rundown />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Rundown from "./Rundown"

export default {
  name: "Selected",
  components: { Rundown },
  data: () => ({
    tab: null,
  }),
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