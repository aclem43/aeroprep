import type { Flight } from '@/models/Flight'
import { computed, ref, type Ref } from 'vue'
import { getCurrentFlightData } from './recording'
import { getCurrentTrackingDecimal } from './trackingConstants'
const lineMode: Ref<'basic' | 'altitude'> = ref('basic')

export const generateLine = computed((flight: Flight) => {
  if (lineMode.value == 'basic') {
    return generateBasicLine(flight)
  } else {
    return []
  }
})

const currentFlight = getCurrentFlightData()
const generateBasicLine = (flight: Flight) => {
  const line: number[][] = []

  if (flight == null) {
    return line
  }
  const currentTrackingDecimal = getCurrentTrackingDecimal()
  currentFlight.value.flightPath.forEach((d) => {
    line.push([
      parseFloat(d.cord.latitude.toFixed(currentTrackingDecimal)),
      parseFloat(d.cord.longitude.toFixed(currentTrackingDecimal)),
    ])
  })
  return line
}
const generateAltitudeLine = () => {}
