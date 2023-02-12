<script setup lang="ts">
  import type { Flight } from '@/models/Flight'
  import { computed, onMounted, ref } from 'vue'

  import 'leaflet/dist/leaflet.css'
  import { LMap, LTileLayer, LPolyline } from '@vue-leaflet/vue-leaflet'
  import { getTrackingDecimal } from '@/scripts/settings/settings'
  import { defaultTrackingDecimal } from '@/scripts/flight/tracking/trackingConstants'

  const props = defineProps<{ flight: Flight | null }>()
  const zoom = ref(2)
  const trackingDecimal = ref(defaultTrackingDecimal)
  const generateLineFromFlight = computed(() => {
    const line: number[][] = []

    if (props.flight == null) {
      return line
    }
    props.flight.flightPath.forEach((d) => {
      line.push([
        parseFloat(d.cord.lattitude.toFixed(trackingDecimal.value)),
        parseFloat(d.cord.longitude.toFixed(trackingDecimal.value)),
      ])
    })
    return line
  })
  onMounted(async () => {
    trackingDecimal.value = await getTrackingDecimal()
  })
</script>

<template>
  <div style="height: 100%; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-polyline :lat-lngs="generateLineFromFlight" color="green"></l-polyline>
    </l-map>
    <div v-if="generateLineFromFlight.length > 0">
      test
      {{ generateLineFromFlight }}
    </div>
  </div>
</template>
