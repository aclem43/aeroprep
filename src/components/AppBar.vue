<script setup lang="ts">
  import router from '@/router'
  import { getAllAircraft, getCurrentAircraft } from '@/scripts/aircraft'
  import { getNetworkStatus } from '@/scripts/network'
  import { setAircraft, getAircraft } from '@/scripts/settings/settings'
  import { computed } from 'vue'
  import { onMounted } from 'vue'
  const aircraft = getAllAircraft()

  const currentAircraft = getCurrentAircraft()
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
</script>
<template>
  <v-app-bar class="">
    <v-app-bar-title>
      <v-btn variant="plain" icon @click="goTo('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn variant="plain" icon disabled>
        <v-icon>{{ networkIcon }}</v-icon>
      </v-btn>
      <v-btn variant="plain" icon @click="goTo('/settings')">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn
        variant="plain"
        icon
        @click="goTo('/prep')"
        style="margin-left: 10px"
      >
        <v-icon>mdi-clipboard</v-icon>
      </v-btn>
      <v-btn variant="plain" icon @click="goTo('/fly')">
        <v-icon>mdi-airplane-takeoff</v-icon>
      </v-btn>
    </v-app-bar-title>
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
</template>

<style>
  .aircraftSelect {
    min-width: 200px;
    max-width: 350px;
    width: 100%;
  }
</style>
