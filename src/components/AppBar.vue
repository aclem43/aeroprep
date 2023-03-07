<script setup lang="ts">
  import router from '@/router'
  import { getAllAircraft, getCurrentAircraft } from '@/scripts/aircraft'
  import { getNetworkStatus } from '@/scripts/network'
  import { getDevToolEnabled } from '@/scripts/settings/devTools'
  import { setAircraft, getAircraft } from '@/scripts/settings/settings'
  import { getKeepAwakeIcon, toggleKeepAwake } from '@/scripts/utils/awake'
  import { computed, onMounted, ref } from 'vue'
  const aircraft = getAllAircraft()

  const currentAircraft = getCurrentAircraft()

  const devToolEnabled = getDevToolEnabled()

  const goTo = (route: string) => {
    router.push(route)
  }

  onMounted(async () => {
    currentAircraft.value = await getAircraft()
  })

  const onAircraftChange = async () => {
    if (currentAircraft.value == null) {
      return
    }
    await setAircraft(currentAircraft.value)
  }
  const networkStatus = getNetworkStatus()

  const networkIcon = computed(() => {
    if (networkStatus.value.connectionType == 'wifi')
      if (networkStatus.value.connected) {
        return 'mdi-wifi'
      } else {
        return 'mdi-wifi-off'
      }
    else if (networkStatus.value.connectionType == 'cellular') {
      if (networkStatus.value.connected) {
        return 'mdi-acess-point'
      } else {
        return 'mdi-acess-off'
      }
    }
    return 'mdi-web'
  })

  const keepAwakeIcon = computed(() => {
    return getKeepAwakeIcon()
  })
  const navDrawer = ref(false)
</script>
<template>
  <v-app-bar class="">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="navDrawer = !navDrawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title> AeroPrep </v-app-bar-title>
    <v-select
      class="aircraftSelect"
      variant="solo"
      label="Aircraft"
      v-model="currentAircraft"
      :items="aircraft"
      item-title="name"
      return-object
      hide-details
      @update:model-value="onAircraftChange"
    ></v-select>
  </v-app-bar>
  <v-navigation-drawer v-model="navDrawer" rail temporary>
    <v-btn variant="plain" icon disabled>
      <v-icon>{{ networkIcon }}</v-icon>
    </v-btn>
    <v-divider></v-divider>
    <v-btn variant="plain" icon @click="goTo('/prep')">
      <v-icon>mdi-clipboard</v-icon>
    </v-btn>
    <v-btn variant="plain" icon @click="goTo('/fly')">
      <v-icon>mdi-airplane-takeoff</v-icon>
    </v-btn>
    <v-divider></v-divider>
    <v-btn variant="plain" icon @click="goTo('/settings')">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-divider></v-divider>
    <v-btn class="align-bottom" variant="plain" icon @click="toggleKeepAwake()">
      <v-icon>{{ keepAwakeIcon }}</v-icon>
    </v-btn>
    <div v-if="devToolEnabled">
      <v-divider></v-divider>
      <v-btn variant="plain" icon>
        <v-icon>mdi-tools</v-icon>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style>
  .aircraftSelect {
    min-width: 200px;
    max-width: 350px;
    width: 100%;
  }
</style>
