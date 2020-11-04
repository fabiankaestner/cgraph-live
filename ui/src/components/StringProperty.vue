<template>
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
        <v-btn text icon color="secondary">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-flex>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {};
</script>

<style scoped>
.v-btn {
  margin-top: -28px;
  margin-left: 10px;
}
</style>