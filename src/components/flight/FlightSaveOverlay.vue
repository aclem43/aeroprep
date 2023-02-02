<script setup lang="ts">
  import { ref } from 'vue'

  const dialog = ref()

  const open = () => {
    dialog.value = true
  }

  defineExpose({ open })
</script>

<template>
  <template>
    <v-dialog v-model="dialog" persistent class="aircraftCreationDialog">
      <v-card>
        <v-card-title> Create aircraft </v-card-title>
        <v-card-item> </v-card-item>
      </v-card>
    </v-dialog>
  </template>
</template>
