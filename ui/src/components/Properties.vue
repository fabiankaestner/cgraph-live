<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    <v-card-title class="headline">{{ name }}</v-card-title>
    <v-card-subtitle>{{ address }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-container>
      <v-list>
        <v-subheader>Node Properties</v-subheader>
        <Property
          v-for="(prop, name) in item._props"
          :key="name"
          :value="evalProp(name, true)"
          @input="handleUpdate"
        />
        <v-subheader>Properties</v-subheader>
        <Property
          v-for="(prop, name) in item.props"
          :key="name"
          :value="evalProp(name, false)"
          @input="handleUpdate"
        />
      </v-list>
      <v-btn
        v-if="updated"
        color="primary"
        class="float-right"
        text
        @click="commit"
      >
        <v-icon> mdi-check </v-icon>
        Commit Changes
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { parseStringAddress } from "common/helpers/address";
import { getStrAddressFromState } from "common/helpers/getters";

import Property from "./Property.vue";

export default {
  name: "Properties",
  components: { Property },
  data() {
    return { updated: false, updatedOwnProps: {}, updatedProps: {} };
  },
  methods: {
    handleUpdate({ own, name, type, value, autoUpdate, link }) {
      let _updatedProps = own ? this.updatedOwnProps : this.updatedProps;
      _updatedProps[name] = {
        type,
        value,
        autoUpdate,
        link,
      };
      this.updated = true;
    },
    evalProp(name, own) {
      console.log(this.item);
      let prop = own ? this.item._props[name] : this.item.props[name];
      return {
        ...prop,
        name,
        own,
      };
    },
    commit() {
      for (let name in this.updatedOwnProps) {
        this.$store.commit(`${this.type}/update_property`, {
          own: true,
          name,
          id: this.id,
          update: this.updatedOwnProps[name],
        });
      }
      for (let name in this.updatedProps) {
        this.$store.commit(`${this.type}/update_property`, {
          own: false,
          name,
          id: this.id,
          update: this.updatedOwnProps[name],
        });
      }
      this.updatedOwnProps = {};
      this.updatedProps;
      this.updated = false;
    },
  },
  computed: {
    address() {
      return this.$store.state.local.properties;
    },
    type() {
      return parseStringAddress(this.address).type;
    },
    id() {
      return parseStringAddress(this.address).id;
    },
    item() {
      if (this.address) {
        return getStrAddressFromState(this.$store.state, this.address);
      }
      return {};
    },
    name() {
      if (this.item._props) {
        return this.item._props.name.value;
      }
      return "";
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
.v-icon {
  margin-right: 10px;
}
</style>