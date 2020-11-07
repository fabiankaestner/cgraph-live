<template>
  <Tree :tree="tree" @click="handleClick" />
</template>

<style scoped>
</style>

<script>
import Tree from "./Tree"

export default {
  name: "Playbacks",
  components: {
    Tree
  },
  methods: {
    handleClick(node) {
      this.$store.commit("local/select_properties", {
        address: node.data.address,
      });
    },
  },
  computed: {
    tree() {
      const data = [];
      const playbacks = this.$store.state.playback;
      for (let playback in playbacks) {
        data.push({
          title: this.$store.getters["playback/evaluate"](playback, "name").value,
          isLeaf: true,
          data: { address: `/playback/${playback}` },
        });
      }
      return data;
    },
  },
};
</script>