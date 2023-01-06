<script setup lang="ts">
  import router from '@/router'
  import { getAllAircraft, getCurrentAircraft } from '@/scripts/aircraft'
  const aircraft = getAllAircraft()

  const currentAircraft = getCurrentAircraft()
  const goTo = (route: string) => {
    router.push(route)
  }
</script>
<template>
  <v-app-bar class="">
    <v-app-bar-title>
      <v-btn variant="plain" icon @click="goTo('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn variant="plain" icon>
        <v-icon>mdi-wifi</v-icon>
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
