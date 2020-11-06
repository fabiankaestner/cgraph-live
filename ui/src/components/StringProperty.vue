<template>
  <v-list-item>
    <v-list-item-content>
      <v-flex>
        <v-text-field :label="value.name" v-model="v" dense outlined placeholder=" " :messages="value.inherited ? 'Inherited' : undefined">
        </v-text-field>
      </v-flex>
      <v-flex shrink>
        <v-btn
          text
          icon
          :color="value.link ? 'primary' : 'secondary'"
          @click="link"
        >
          <v-icon>mdi-link</v-icon>
        </v-btn>
        <v-btn
          text
          icon
          :color="value.autoUpdate ? 'primary' : 'secondary'"
          @click="autoUpdate"
        >
          <v-icon>mdi-update</v-icon>
        </v-btn>
        <v-btn text icon color="secondary" @click="clear">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-flex>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "StringProperty",
  props: ["value"],
  methods: {
    link() {
      this.$emit("input", { ...this.value, link: !this.value.link });
    },
    autoUpdate() {
      this.$emit("input", {
        ...this.value,
        autoUpdate: !this.value.autoUpdate,
      });
    },
    clear() {
      this.$emit("input", {
        ...this.value,
        value: null,
      });
    },
  },
  computed: {
    v: {
      get() {
        return this.value.value;
      },
      set(update) {
        this.$emit("input", { ...this.value, value: update });
      },
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin-top: -28px;
  margin-left: 10px;
}
</style>