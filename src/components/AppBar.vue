<script setup lang="ts">
  import router from '@/router'

  const goHome = () => {
    router.push('/')
  }
</script>
<template>
  <v-app-bar class="">
    <v-app-bar-title>
      <v-btn variant="plain" icon @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn variant="plain" icon>
        <v-icon>mdi-wifi</v-icon>
      </v-btn>
      <v-btn variant="plain" icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar-title>
    <v-select
      class="aircraftSelect"
      variant="solo"
      label="Aircraft"
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
