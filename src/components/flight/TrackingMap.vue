<script setup lang="ts">
  import {
    flipCoordinates,
    getAirspaces,
    getIcaoClassNameById,
  } from '@/scripts/flight/openaip'
  import {
    type AltitudeLine,
    generateLine,
  } from '@/scripts/flight/tracking/map'
  import { getCurrentLineModeRef } from '@/scripts/flight/tracking/trackingConstants'
  import { getMapAirspace } from '@/scripts/settings/mapsettings'
  import {
    LControlScale,
    LMap,
    LPolygon,
    LPolyline,
    LPopup,
    LTileLayer,
  } from '@vue-leaflet/vue-leaflet'
  import 'leaflet/dist/leaflet.css'
  import { computed, ref } from 'vue'
  import { onMounted } from 'vue'

  const zoom = ref(2)
  const lineMode = getCurrentLineModeRef()
  const center = computed(() => {
    let line = generateLine.value
    const lineMode = getCurrentLineModeRef().value
    if (lineMode == 'basic') {
      line = line as number[][]
      if (line[0] != null) {
        return line[0]
      } else {
        return [0, 0]
      }
    } else {
      line = line as AltitudeLine
      if (line.lines[0] == null) {
        return [0, 0]
      }
      if (line.lines[0].line[0] != null) {
        return line.lines[0].line[0]
      } else {
        return [0, 0]
      }
    }
  })

  const mapRef = ref()

  const airspaces = getAirspaces()
  const airspaceEnabled = ref(false)
  onMounted(async () => {
    airspaceEnabled.value = await getMapAirspace()
  })
</script>

<template>
  <div style="height: 100%; width: 100%">
    <l-map
      ref="mapRef"
      v-model:zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <template v-if="lineMode == 'basic'">
        <l-polyline
          :lat-lngs="generateLine as number[][]"
          color="#fcba03"
        ></l-polyline>
      </template>
      <template
        v-else
        v-for="(altLine,index) in (generateLine as AltitudeLine).lines"
        v-bind:key="index"
      >
        <l-polyline
          :lat-lngs="altLine.line"
          :color="altLine.color"
        ></l-polyline>
      </template>
      <template v-if="airspaceEnabled">
        <div v-for="airspace in airspaces" v-bind:key="airspace.id">
          <l-polygon
            :lat-lngs="flipCoordinates(airspace.geometry.coordinates)"
            color="#41b782"
            :fill="true"
            :fillOpacity="0.01"
            fillColor="#41b782"
          >
            <l-popup> {{ getIcaoClassNameById(airspace.icaoClass) }} </l-popup>
          </l-polygon>
        </div>
      </template>

      <l-control-scale />
    </l-map>
  </div>
  <div>
    {{ airspaces }}
  </div>
</template>
