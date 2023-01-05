<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'

  import {
    getWeatherApiKey,
    setTheme,
    setWeatherApiKey,
  } from '@/scripts/settings/settings'
  import { getCurrentTheme } from '@/scripts/utils/themes'
  import { onMounted, ref, watch } from 'vue'

  const weatherApiKey = ref()

  const saveWeatherApiKey = async () => {
    console.log('Test')
    await setWeatherApiKey(weatherApiKey.value)
    console.log(getWeatherApiKey())
  }

  onMounted(async () => {
    weatherApiKey.value = await getWeatherApiKey()
  })

  const theme = getCurrentTheme()

  watch(theme, async () => {
    await setTheme(theme.value)
  })
</script>

<template>
  <AppBar />
  <v-main>
    <v-card>
      <v-card-title> Settings </v-card-title>
      <v-card-item>
        <v-switch
          true-value="darkTheme"
          false-value="lightTheme"
          :label="`Theme: ${theme}`"
          v-model="theme"
        ></v-switch>
        <div class="d-flex">
          <v-text-field
            label="Weather Api Key"
            variant="underlined"
            v-model="weatherApiKey"
          ></v-text-field>
          <v-btn prepend-icon="mdi-content-save" @click="saveWeatherApiKey()">
            Save
          </v-btn>
        </div>
      </v-card-item>
    </v-card>
  </v-main>
</template>
