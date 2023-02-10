<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import { openAlert } from '@/scripts/utils/alert'
  import {
    getDefaultPilotWeight,
    getTrackingDecimal,
    getTrackingInterval,
    getWeatherApiKey,
    setDefaultPilotWeight,
    setTheme,
    setTrackingDecimal,
    setTrackingInterval,
    setWeatherApiKey,
  } from '@/scripts/settings/settings'
  import { getCurrentTheme } from '@/scripts/utils/themes'
  import { computed, onMounted, ref, watch, type Ref } from 'vue'
  import AircraftCreationOverlay from '@/components/settings/AircraftCreationOverlay.vue'
  import AirportAdditionOverlay from '@/components/settings/AirportAdditionOverlay.vue'
  import { Dialog } from '@capacitor/dialog'
  import {
    deleteAircraft,
    getAllAircraft,
    type Aircraft,
  } from '@/scripts/aircraft'
  import { getVersion } from '@/scripts/utils/version'
  import {
    deleteAirport,
    getAirportsRef,
    type Airport,
  } from '@/scripts/airport'
  import {
    removeAllExceptSaves,
    removeAllSaves,
    removeAllStorage,
  } from '@/scripts/database'
  import { loadStorageInfo, getStorageInfo } from '@/scripts/settings/devTools'
  // Dev Settings/Tools
  const devTools = ref(false)
  const storageInfo = getStorageInfo()
  // Main Settings
  const weatherApiKey = ref()
  const defaultPilotWeight = ref()
  const trackingInterval = ref()
  const trackingDecimal = ref()
  const saveWeatherApiKey = async () => {
    await setWeatherApiKey(weatherApiKey.value)
    openAlert('Api Key Saved', 2000)
  }
  const saveDefaultPilotWeight = async () => {
    await setDefaultPilotWeight(defaultPilotWeight.value)
    openAlert('Pilot Weight Saved', 2000)
  }
  const saveTrackingInterval = async () => {
    await setTrackingInterval(trackingInterval.value)
    openAlert('Tracking Interval Saved', 2000)
  }
  const saveTrackingDecimal = async () => {
    await setTrackingDecimal(trackingDecimal.value)
    openAlert('Tracking Decimal Saved', 2000)
  }
  const deleteAllData = async () => {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: 'Are you sure that you want to delete ALL of the saved data',
    })
    if (value) {
      await removeAllStorage()
      openAlert('All Data Deleted', 2000)
    } else openAlert('Canceled', 2000)
  }
  const deleteAllButSaves = async () => {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message:
        'Are you sure that you want to delete ALL but the Saved Flights of the saved data',
    })
    if (value) {
      await removeAllExceptSaves()
      openAlert('All Data Except For Saves Deleted', 2000)
    } else openAlert('Canceled', 2000)
  }
  const deleteAllSaves = async () => {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: 'Are you sure that you want to delete ALL the saves',
    })
    if (value) {
      await removeAllSaves()
      openAlert('All the saves deleted', 2000)
    } else openAlert('Canceled', 2000)
  }
  onMounted(async () => {
    defaultPilotWeight.value = await getDefaultPilotWeight()
    weatherApiKey.value = await getWeatherApiKey()
    trackingInterval.value = await getTrackingInterval()
    trackingDecimal.value = await getTrackingDecimal()
  })

  const theme = getCurrentTheme()

  const aircraftCreationOverlay = ref()
  const airportAdditionOverlay = ref()

  const aircraftList = getAllAircraft()

  const removeAircraft = async (aircraft: Aircraft) => {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Are you sure you want to delete the Aircraft?`,
    })
    if (value) {
      await deleteAircraft(aircraft)
      openAlert('Aircraft Deleted', 2000)
    }
  }
  const removeAirport = async (airport: Airport) => {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Are you sure you want to delete the Airport?`,
    })
    if (value) {
      await deleteAirport(airport)
      openAlert('Airport Deleted', 2000)
    }
  }

  const themeIcon = computed(() => {
    if (theme.value == 'darkTheme') {
      return 'mdi-weather-night'
    } else {
      return 'mdi-weather-sunny'
    }
  })

  const airports: Ref<Airport[]> = getAirportsRef()

  watch(theme, async () => {
    await setTheme(theme.value)
  })
</script>

<template>
  <AppBar />
  <v-main>
    <AircraftCreationOverlay
      ref="aircraftCreationOverlay"
    ></AircraftCreationOverlay>
    <AirportAdditionOverlay
      ref="airportAdditionOverlay"
    ></AirportAdditionOverlay>
    <v-card>
      <v-card-title> Settings </v-card-title>
      <v-card-subtitle>AeroPrep Version: {{ getVersion() }}</v-card-subtitle>
      <v-card-item>
        <v-switch
          true-value="darkTheme"
          false-value="lightTheme"
          :prepend-icon="themeIcon"
          label="Theme"
          v-model="theme"
        ></v-switch>
        <div class="settings_input_row">
          <v-text-field
            label="Weather Api Key"
            variant="underlined"
            v-model="weatherApiKey"
          ></v-text-field>
          <v-btn prepend-icon="mdi-content-save" @click="saveWeatherApiKey">
            Save
          </v-btn>
        </div>
        <div class="settings_input_row">
          <v-text-field
            label="Default Pilot Weight"
            variant="underlined"
            suffix="kg"
            v-model="defaultPilotWeight"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
          ></v-text-field>
          <v-btn
            prepend-icon="mdi-content-save"
            @click="saveDefaultPilotWeight"
          >
            Save
          </v-btn>
        </div>
      </v-card-item>
      <v-card-subtitle>Groups</v-card-subtitle>
      <v-card-item>
        <div class="d-flex text-center settings_chip_gap">
          <div v-for="aircraft in aircraftList" :key="aircraft.name">
            <v-chip
              variant="elevated"
              @click="removeAircraft(aircraft)"
              append-icon="mdi-close-circle"
            >
              {{ aircraft.name }}</v-chip
            >
          </div>
          <v-btn @click="aircraftCreationOverlay.open()">Add Aircraft</v-btn>
        </div>
        <div class="d-flex text-center settings_chip_gap">
          <div v-for="airport in airports" :key="airport.code">
            <v-chip
              variant="elevated"
              @click="removeAirport(airport)"
              append-icon="mdi-close-circle"
            >
              <v-icon v-if="airport.home">mdi-home</v-icon>
              {{ airport.code }}</v-chip
            >
          </div>
          <v-btn @click="airportAdditionOverlay.open()">Add Airport</v-btn>
        </div>
      </v-card-item>
      <v-card-subtitle
        ><v-icon>mdi-crosshairs-gps</v-icon>Tracking</v-card-subtitle
      >
      <v-card-item>
        <div class="settings_input_row">
          <v-text-field
            v-model="trackingInterval"
            label="Tracking"
            hint="Time between getting GPS points"
            suffix="Milliseconds"
            variant="underlined"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
          ></v-text-field>
          <v-btn
            prepend-icon="mdi-content-save"
            @click="saveTrackingInterval()"
          >
            Save
          </v-btn>
        </div>
        <div class="settings_input_row">
          <v-text-field
            v-model="trackingDecimal"
            label="Tracking Decimal"
            hint="Accuracy of GPS points used"
            suffix="Seconds"
            variant="underlined"
            type="number"
            pattern="[0-9]*"
            inputmode="numeric"
          ></v-text-field>
          <v-btn prepend-icon="mdi-content-save" @click="saveTrackingDecimal()">
            Save
          </v-btn>
        </div>
      </v-card-item>
      <v-card-subtitle><v-icon>mdi-alert</v-icon>Danger Zone</v-card-subtitle>
      <v-card-item>
        <div class="settings_input_row">
          <v-btn color="warning" @click="deleteAllData()"
            ><v-icon>mdi-alert</v-icon> Delete All Stored Data</v-btn
          >
          <v-btn color="warning" @click="deleteAllSaves()"
            ><v-icon>mdi-alert</v-icon> Delete All Flight Saves</v-btn
          >
          <v-btn color="warning" @click="deleteAllButSaves()"
            ><v-icon>mdi-alert</v-icon> Delete All But Flight Saves</v-btn
          >
        </div>
      </v-card-item>
      <v-card-subtitle><v-icon>mdi-tools</v-icon>Dev Tools </v-card-subtitle>
      <v-card-item>
        <div class="settings_input_row">
          <v-switch
            v-model="devTools"
            color="warning"
            hide-details
            :label="devTools ? 'Disable' : 'Enable'"
          ></v-switch>
        </div>
        <div v-if="devTools" class="settings_input_row">
          <v-btn color="info" @click="loadStorageInfo"
            ><v-icon>mdi-reload</v-icon> Load Data</v-btn
          >
          <v-btn color="info" v-clipboard:copy="storageInfo"
            ><v-icon>mdi-clipboard</v-icon>Storage To Clip Board</v-btn
          >
        </div>
      </v-card-item>
    </v-card>
  </v-main>
</template>

<style>
  .settings_input_row {
    display: flex;
    gap: 10px;
  }
  .settings_chip_gap {
    gap: 10px;
    padding: 10px;
  }
</style>
