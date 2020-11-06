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
      let updatedProps = own ? this.updatedOwnProps : this.updatedProps;
      this.$set(updatedProps, name, {
        type,
        value,
        autoUpdate,
        link,
      });
      this.updated = true;
    },
    evalProp(name, own) {
      let updatedProps = own ? this.updatedOwnProps : this.updatedProps;
      let props = own ? this.item._props : this.item.props;

      if (updatedProps[name] === undefined) {
        this.$set(updatedProps, name, false);
      }

      let prop = { name, own };

      if (updatedProps[name]) {
        Object.assign(prop, updatedProps[name]);
      } else {
        Object.assign(prop, props[name]);
      }

      return prop;
    },
    commit() {
      // loop through all updatedProps
      for (let name in this.updatedOwnProps) {
        // check if really updated, or just default value false
        if (this.updatedOwnProps[name]) {
          // update the property in the vuex store
          this.$store.commit(`${this.type}/update_property`, {
            own: true,
            name,
            id: this.id,
            update: this.updatedOwnProps[name],
          });
          // clear the update value
          this.updatedOwnProps[name] = false;
        }
      }
      // repeat for inherited properties
      for (let name in this.updatedProps) {
        if (this.updatedProps[name]) {
          this.$store.commit(`${this.type}/update_property`, {
            own: false,
            name,
            id: this.id,
            update: this.updatedProps[name],
          });
          this.updatedProps[name] = false;
        }
      }
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