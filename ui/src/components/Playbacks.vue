<template>
  <div>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.id" link>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
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
      return this.$store.state.playbacks;
    },
  },
  methods: {
  },
};
</script>