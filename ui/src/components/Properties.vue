<template>
  <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
    <v-card-title class="headline">{{ item.name }}</v-card-title>
    <v-card-subtitle>{{ address }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-container>
      <v-list>
        <v-subheader>Node Properties</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-flex>
              <v-text-field label="Name" placeholder=" " dense outlined>
                {{ item.name }}
              </v-text-field>
            </v-flex>
            <v-flex shrink>
              <v-btn text icon color="secondary">
                <v-icon>mdi-link</v-icon>
              </v-btn>
              <v-btn text icon color="secondary">
                <v-icon>mdi-update</v-icon>
              </v-btn>
            </v-flex>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--<v-row>
        <v-col>
          <v-subheader>Node Properties</v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Name" placeholder=" " dense>
            {{ item.name }}
          </v-text-field>
        </v-col>
        <v-col>

        </v-col>
      </v-row>-->
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

<style>
.v-window {
  flex-grow: 1;
}
.v-tabs {
  flex: 0 0 auto !important;
}
.v-icon {
  padding-left: 14px !important;
}
.v-btn {
  margin-top: -28px;
  margin-left: 10px;
}
</style>