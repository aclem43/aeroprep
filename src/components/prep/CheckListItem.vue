<script setup lang="ts">
  import { ref } from 'vue'

  const show = ref(false)
</script>

<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <v-checkbox label="Title" hide-details></v-checkbox>
      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        variant="plain"
        @click="show = !show"
      ></v-btn
    ></v-card-title>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
