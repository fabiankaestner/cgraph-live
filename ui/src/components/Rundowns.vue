<template>
  <div>
    <v-toolbar dense flat>
      <v-btn color="secondary">
        Add
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item" link>
        <v-list-item-content>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return ["Test", "Rundown"];
    },
  },
  methods: {
  },
};
</script>

<style>
</style>