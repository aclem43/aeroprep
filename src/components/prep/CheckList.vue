<script setup lang="ts">
  import { ref } from 'vue'
  import CheckListItem from './CheckListItem.vue'
</script>

<template>
  <v-card title="CheckList" elevation="12">
    <v-card-item>
      <CheckListItem
        title="IMSAFE"
        description="Illnes Medication ..."
      ></CheckListItem>
      <CheckListItem
        title="Weather"
        description="Check the metar and the weather "
        link="weather"
      ></CheckListItem>
    </v-card-item>
  </v-card>
</template>
