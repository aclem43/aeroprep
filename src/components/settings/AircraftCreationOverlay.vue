<script setup lang="ts">
  import { ref } from 'vue'

  const dialog = ref()

  const open = () => {
    dialog.value = true
  }

  defineExpose({ open })
</script>

<template>
  <v-dialog v-model="dialog" persistent class="aircraftCreationDialog">
    <v-card>
      <v-card-title> Create aircraft </v-card-title>
      <v-card-items>
        <div class="aircraftCreationDialog_form">
          <v-text-field
            variant="solo"
            hide-details
            label="Aircraft Name"
          ></v-text-field>
          <v-text-field
            variant="solo"
            hide-details
            label="Fuel Burn (l/h)"
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
          ></v-text-field>
        </div>
        <div class="aircraftCreationDialog_form_right">
          <v-btn>Create</v-btn>
        </div>
      </v-card-items>
      <v-card-actions>
        <v-btn @click="dialog = false"> Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
  .aircraftCreationDialog {
    max-width: 800px;
  }
  .aircraftCreationDialog_form {
    padding: 10px;
    display: flex;
    gap: 10px;
  }
  .aircraftCreationDialog_form_right {
    justify-content: right;
    padding: 10px;
    display: flex;
    gap: 10px;
  }
</style>
