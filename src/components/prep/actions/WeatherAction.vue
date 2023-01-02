<script setup lang="ts">
  import { ref } from 'vue'

  const tafHours = ref('2')
</script>

<template>
  <div>
    <div>
      <div class="d-flex align-center">
        <div class="airportSearch mr-3">
          <v-autocomplete
            variant="solo"
            label="Airport"
            hide-details
            density="compact"
          ></v-autocomplete>
        </div>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-radio-group
          v-model="tafHours"
          label="TAF Duration"
          hide-details
          inline
        >
          <v-radio label="2hrs" value="2"></v-radio>
          <v-radio label="4hrs" value="4"></v-radio>
          <v-radio label="6hrs" value="6"></v-radio>
          <v-radio label="8hrs" value="8"></v-radio>
          <v-radio label="24hrs" value="24"></v-radio>
        </v-radio-group>
      </div>
      <div class="">
        <v-chip-group selected-class="text-primary">
          <v-chip variant="elevated" @click="'test'">YBAF</v-chip>
          <v-chip variant="elevated" @click="'test'">YBBN</v-chip>
        </v-chip-group>
      </div>
    </div>
    <v-card elevation="8">
      <v-card-title> YBAF - ArcherField Airport </v-card-title>
      <v-card-text>
        <strong>Terminal Area Forecast</strong> <br />290 5kts etc..
      </v-card-text>
      <v-card-text> <strong>METAR</strong> <br />290 5kts etc.. </v-card-text>
      <v-card-subtitle></v-card-subtitle>
    </v-card>
  </div>
</template>

<style>
  .airportSearch {
    min-width: 200px;
    max-width: 350px;
    width: 100%;
  }
  .airportChips {
    padding: 5px;
    gap: 5px;
  }
</style>
