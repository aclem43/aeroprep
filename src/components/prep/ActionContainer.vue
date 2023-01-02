<script setup lang="ts">
  import { ref } from 'vue'

  const tab = ref()
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" color="primary">
      <v-tab value="one">1</v-tab>
      <v-tab value="two">2</v-tab>
    </v-tabs>
    <v-card-item>
      <v-window v-model="tab">
        <v-window-item value="one">One</v-window-item>
        <v-window-item value="two">Two</v-window-item>
      </v-window>
    </v-card-item>
  </v-card>
</template>
