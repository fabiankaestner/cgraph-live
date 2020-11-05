<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    <v-tabs v-model="tab" color="primary" dark slider-color="primary">
      <v-tab v-for="t in tabs" :key="t.address">
        <v-icon @click="deselect(t.address)">mdi-close</v-icon>
        {{ t._props.name.value }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="t in tabs" :key="t.address">
        <component :is="t.component" :address="t.id"></component>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { parseStringAddress } from "common/helpers/address"
import { getStrAddressFromState } from "common/helpers/getters"
import Rundown from "./Rundown";

export default {
  name: "Selected",
  components: {},
  computed: {
    tabs() {
      const tabs = [];
      for (let address of this.$store.state.local.selected) {
        const tab = getStrAddressFromState(this.$store.state, address);
        const { type } = parseStringAddress(address);
        let component = "";
        if (type === "rundown") {
          component = Rundown;
        }
        tabs.push({
          ...tab,
          address,
          component
        });
      }
      return tabs;
    },
    tab: {
      get() {
        return this.$store.getters["local/currentlySelectedIdx"];
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
      this.$store.commit("local/deselect", { address });
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