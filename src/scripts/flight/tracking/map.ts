import type { Flight, FlightLocation } from '@/models/Flight'
import { logger } from '@/scripts/utils/logger'
import { computed, ref, type Ref } from 'vue'
import { getCurrentFlightData } from './recording'
import { getCurrentTrackingDecimal } from './trackingConstants'
const lineMode: Ref<'basic' | 'altitude'> = ref('basic')

export const generateLine = computed(() => {
  const flight = getCurrentFlightData().value
  if (lineMode.value == 'basic') {
    const line = generateBasicLine(flight)
    logger.log('Generated line: ' + line.toString())
    return line
  } else {
    return []
  }
})

const currentFlight = getCurrentFlightData()
const generateBasicLine = (flight: Flight): number[][] => {
  const line: number[][] = []

  if (flight == null) {
    logger.log('Flight is null')
    return line
  }
  const currentTrackingDecimal = getCurrentTrackingDecimal()
  currentFlight.value.flightPath.forEach((d: FlightLocation) => {
    if (d.cord == null) {
      logger.warn('Cord is null')
      logger.log('Flight' + JSON.stringify(flight))
    }
    if (d.cord.lattitude == null || d.cord.longitude == null) {
      logger.warn('Cord is null')
      logger.log('Flight' + JSON.stringify(flight))
    }
    line.push([
      parseFloat(d.cord.lattitude.toFixed(currentTrackingDecimal)),
      parseFloat(d.cord.longitude.toFixed(currentTrackingDecimal)),
    ])
  })
  return line
}
const generateAltitudeLine = () => {}
