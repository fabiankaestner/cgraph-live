<template>
  <v-app>
    <v-row no-gutters>
      <v-col cols="3" class="d-flex">
        <v-container class="d-flex">
          <Sidebar />
        </v-container>
      </v-col>
      <v-col cols="3" class="d-flex">
        <v-container class="d-flex">
          <Selected />
        </v-container>
      </v-col>
      <v-col cols="3" class="d-flex"></v-col>
      <v-col cols="3" class="d-flex"></v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
.container {
  flex-grow: 1;
}
</style>

<script>
import Sidebar from "./components/Sidebar";
import Selected from "./components/Selected";

export default {
  name: "App",

  components: {
    Sidebar,
    Selected,
  },

  data: () => ({}),
};
</script>