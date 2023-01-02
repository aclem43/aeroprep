<script setup lang="ts">
  import { ref } from 'vue'
  import CheckListItem from './CheckListItem.vue'
</script>

<template>
  <v-card title="CheckList" elevation="12">
    <v-card-item>
      <CheckListItem></CheckListItem>
      <CheckListItem></CheckListItem>
      <CheckListItem></CheckListItem>
    </v-card-item>
  </v-card>
</template>
