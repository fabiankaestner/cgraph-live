<template>
  <div>
    <v-toolbar dense flat>
      <v-btn color="secondary">
        Add
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <Tree :tree="tree" @dblclick="handleDblClick" @click="handleClick"/>
  </div>
</template>

<script>
import Tree from "./Tree";

export default {
  components: {
    Tree,
  },
  computed: {
    tree() {
      const data = [];
      const rundowns = this.$store.state.rundown;
      for (let rundown in rundowns) {
        data.push({
          title: rundowns[rundown]._props.name.value,
          isLeaf: true,
          isSelectable: false,
          data: { address: `/rundown/${rundown}` },
        });
      }
      return data;
    },
  },
  methods: {
    handleDblClick(node) {
      this.$store.commit("local/select", { address: node.data.address })
    },
    handleClick(node) {
      this.$store.commit("local/select_properties", { address: node.data.address })
    }
  },
};
</script>

<style>
</style>