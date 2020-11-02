<template>
  <div>
    <v-toolbar dense flat>
      <v-btn v-on:click="add" icon color="primary">
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

<style scoped>
</style>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.graphics;
    },
  },
  methods: {
    add() {
      console.log("herer");
      this.$store.commit(
        "graphics/add",
        `Graphics ${this.$store.state.graphics.length + 1}`
      );
    },
  },
};
</script>