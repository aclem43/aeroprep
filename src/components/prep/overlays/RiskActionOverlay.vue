<script setup lang="ts">
  import { ref } from 'vue'

  const dialog = ref()
  const open = async () => {}

  defineExpose({ open })
</script>
<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>Test</v-card-title>

      <v-card-item> </v-card-item>
    </v-card>
  </v-dialog>
</template>
