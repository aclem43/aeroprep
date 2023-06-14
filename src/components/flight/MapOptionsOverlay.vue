<script setup lang="ts">
  import {
    getAirspaceIcaoClasses,
    getIcaoClassIncluded,
    loadAirspaces,
  } from '@/scripts/flight/openaip'
  import { type Ref, ref } from 'vue'

  import MapSettings from '../settings/MapSettings.vue'

  const dialog = ref()
  const airspaceOptions = getAirspaceIcaoClasses()
  const enabledAirspaces: Ref<number[]> = getIcaoClassIncluded()

  const open = async () => {
    dialog.value = true
  }
  defineExpose({ open })
</script>
<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> Map Options </v-card-title>
      <v-card-subtitle> Map Settings </v-card-subtitle>
      <v-card-item>
        <MapSettings />
      </v-card-item>
      <v-card-subtitle>Airspace Settings</v-card-subtitle>
      <v-card-item>
        <div class="settings_input_row">
          <v-select
            v-model="enabledAirspaces"
            :items="airspaceOptions"
            label="Enabled Airspaces"
            density="compact"
            item-title="name"
            item-value="id"
            multiple
            hide-details
          ></v-select>
          <v-btn color="primary" @click="loadAirspaces()"
            >Reload Airspaces</v-btn
          >
        </div>
      </v-card-item>
      <v-card-actions class="flex-row-reverse mx-4">
        <v-btn variant="outlined" @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
