<script setup lang="ts">
  import {
    getMapAirspace,
    getOpenAipApiKey,
    setMapAirspace,
    setOpenAipApiKey,
  } from '@/scripts/settings/mapsettings'
  import { openAlert } from '@/scripts/utils/alert'
  import { onMounted, ref } from 'vue'

  const openAipApiKey = ref('')
  const mapAirspace = ref(false)

  const onChangeMapAirspace = async (value: unknown) => {
    const bool: boolean = value as boolean
    mapAirspace.value = bool
    setMapAirspace(bool)
  }

  const saveOpenAipApiKey = async () => {
    await setOpenAipApiKey(openAipApiKey.value)
    openAlert('Open AIP Api Key Saved')
  }

  onMounted(async () => {
    openAipApiKey.value = await getOpenAipApiKey()
    mapAirspace.value = await getMapAirspace()
  })
</script>

<template>
  <div class="settings_input_row">
    <v-switch
      @update:model-value="onChangeMapAirspace"
      :model-value="mapAirspace"
      label="Show Map Airspace"
      color="primary"
      hide-details
    ></v-switch>
  </div>
  <div class="settings_input_row">
    <v-text-field
      label="OpenAIP Api Key"
      variant="underlined"
      v-model="openAipApiKey"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveOpenAipApiKey">
      Save
    </v-btn>
  </div>
</template>
