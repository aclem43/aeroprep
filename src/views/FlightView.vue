<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import { GoogleMap } from '@capacitor/google-maps'
  import { onMounted, ref, type Ref } from 'vue'

  const mapRef: Ref<HTMLElement | null | undefined> = ref()
  let map: null | GoogleMap = null
  onMounted(async () => {
    if (mapRef.value == null) {
      return
    }
    const map = await GoogleMap.create({
      id: 'map', // Unique identifier for this map instance
      element: mapRef.value, // reference to the capacitor-google-map element
      apiKey: 'AIzaSyDQRmF7zp_5oSo2aUVaURHOQ5o5a7xcL-8', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: -27.57121889,
          lng: 153.0077213499,
        },
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    })
    // Add a marker to the map
    const markerId = await map.addMarker({
      coordinate: {
        lat: 33.6,
        lng: -117.9,
      },
    })
    await map.enableClustering()
  })
</script>
<template>
  <AppBar />
  <v-main>
    {{ map }}
    <capacitor-google-map id="map" ref="mapRef"></capacitor-google-map
  ></v-main>
</template>

<style>
  capacitor-google-map {
    display: inline-block;
    width: 60%;
    height: 100%;
  }
</style>
