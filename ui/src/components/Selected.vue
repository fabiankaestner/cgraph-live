<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    <v-tabs
      v-model="tab"
      color="primary"
      dark
      slider-color="primary"
    >
      <v-tab v-for="t in tabs" :key="t">
        <v-icon @click="deselect(t)">mdi-close</v-icon>
        {{ t }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="t in tabs" :key="t">
        <div>
          {{ t }}
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  name: "Selected",
  components: {},
  computed: {
    tabs() {
      return this.$store.state.local.selected;
    },
    tab: {
      get() {
        return this.$store.state.local.currentlySelectedIdx;
      },
      set(newValue) {
        this.$store.commit("local/select_tab", {
          address: this.$store.state.local.selected[newValue],
        });
      },
    },
  },
  methods: {
    deselect(address) {
      this.$store.commit("local/deselect", { address })
    }
  }
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