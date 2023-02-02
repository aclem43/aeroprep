<script setup lang="ts">
  import type { Flight } from '@/models/Flight'
  import { computed, ref } from 'vue'
  const view = ref()
  const center = ref([40, 40])

  const zoom = ref(0)
  const rotation = ref(0)

  const props = defineProps<{ flight: Flight | null }>()

  const generateLineFromFlight = computed(() => {
    const testLine = [[-27.502808641996534, 152.9606629798137]]
    if (props.flight == null) {
      return testLine
    }
    const line: number[][] = []
    props.flight.flightPath.forEach((d) => {
      line.push([d.cord.longitude * 100000, d.cord.lattitude * 10000])
    })
    console.log(testLine)
    return testLine
  })

  const strokeWidth = ref(10)
  const strokeColor = ref('red')
</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 100%"
  >
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" />
    <ol-mouseposition-control></ol-mouseposition-control>
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-line-string
            :coordinates="generateLineFromFlight"
          ></ol-geom-line-string>
          <ol-style>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>
  </ol-map>
</template>
