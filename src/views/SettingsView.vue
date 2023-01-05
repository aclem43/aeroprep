<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'

  import {
    getWeatherApiKey,
    setWeatherApiKey,
  } from '@/scripts/settings/apiKeys'
  import { onMounted, ref } from 'vue'

  const weatherApiKey = ref()

  const saveWeatherApiKey = async () => {
    console.log('Test')
    await setWeatherApiKey(weatherApiKey.value)
    console.log(getWeatherApiKey())
  }

  onMounted(async () => {
    weatherApiKey.value = await getWeatherApiKey()
  })
</script>

<template>
  <AppBar />
  <v-main>
    <v-card>
      <v-card-title> Settings </v-card-title>
      <v-card-item>
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
