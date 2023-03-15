import type { Flight, FlightLocation } from '@/models/Flight'
import { logger } from '@/scripts/utils/logger'
import { computed, ref, type Ref } from 'vue'
import { getCurrentFlightData } from './recording'
import {
  getCurrentRateOfClimb,
  getCurrentTrackingDecimal,
} from './trackingConstants'
const lineMode: Ref<'basic' | 'altitude'> = ref('basic')

export const generateLine = computed(() => {
  const flight = getCurrentFlightData().value
  if (lineMode.value == 'basic') {
    const line = generateBasicLine(flight)
    logger.log('Generated line: ' + line.toString())
    return line
  }
  if (lineMode.value == 'altitude') {
    return generateAltitudeLines(flight)
  } else {
    return []
  }
})

const generateBasicLine = (flight: Flight): number[][] => {
  const line: number[][] = []

  if (flight == null) {
    logger.log('Flight is null')
    return line
  }
  const currentTrackingDecimal = getCurrentTrackingDecimal()
  flight.flightPath.forEach((d: FlightLocation) => {
    checkIfNull(d)
    line.push([
      parseFloat(d.cord.lattitude.toFixed(currentTrackingDecimal)),
      parseFloat(d.cord.longitude.toFixed(currentTrackingDecimal)),
    ])
  })
  return line
}

interface AltitudeLine {
  lines: {
    color?: string
    climbing: boolean
    line: number[][]
  }[]
}

const generateAltitudeLines = (flight: Flight): AltitudeLine => {
  const altitudeLines: AltitudeLine = { lines: [] }

  if (flight == null) {
    logger.log('Flight is null')
    return altitudeLines
  }

  const currentTrackingDecimal = getCurrentTrackingDecimal()
  const currentRateOfClimb = getCurrentRateOfClimb()
  if (flight.flightPath.length == 0) {
    logger.log('No Points Recorded Yet')
    return altitudeLines
  }
  let lastPoint = flight.flightPath[0]
  let currentLineIndex = 0
  altitudeLines.lines.push({ climbing: false, line: [] })
  flight.flightPath.forEach((d: FlightLocation) => {
    checkIfNull(d)
    const rateOfClimb = calculateRateOfClimb(lastPoint, d)
    if (rateOfClimb > currentRateOfClimb) {
      if (!altitudeLines.lines[currentLineIndex].climbing) {
        currentLineIndex =
          altitudeLines.lines.push({
            climbing: true,
            line: [],
          }) - 1
      }
    }
    lastPoint = d
  })
  return altitudeLines
}

const calculateRateOfClimb = (
  point1: FlightLocation,
  point2: FlightLocation
): number => {
  const time = point2.time - point1.time
  if (point1.altitude == null || point2.altitude == null) {
    logger.warn('Altitude Is Null')
    return 0
  }
  const altitude = point2.altitude - point1.altitude
  const rateOfClimb = altitude / new Date(time).getMinutes()

  return Math.abs(rateOfClimb)
}

const checkIfNull = (d: FlightLocation) => {
  if (d.cord == null) {
    logger.warn('Cord is null')
  }
  if (d.cord.lattitude == null || d.cord.longitude == null) {
    logger.warn('Cord is null')
  }
}
