import type { Flight, FlightLocation } from '@/models/Flight'
import { computed } from 'vue'
import { logger } from '@/scripts/utils/logger'
import { getCurrentFlightData } from './recording'
import {
  getCurrentRateOfClimb,
  getCurrentTrackingDecimal,
  getLineMode,
} from './trackingConstants'

export const generateLine = computed((): number[][] | AltitudeLine => {
  const flight = getCurrentFlightData().value
  const lineMode = getLineMode()
  if (lineMode == 'basic') {
    const line = generateBasicLine(flight)
    logger.log('Generated line: ' + line.toString())
    return line
  }
  const line = generateAltitudeLines(flight)
  console.log(line)
  return line
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

export interface AltitudeLine {
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
  altitudeLines.lines.push({ climbing: false, color: 'green', line: [] })
  flight.flightPath.forEach((d: FlightLocation) => {
    checkIfNull(d)
    const rateOfClimb = calculateRateOfClimb(lastPoint, d)
    if (rateOfClimb > currentRateOfClimb) {
      if (!altitudeLines.lines[currentLineIndex].climbing) {
        currentLineIndex =
          altitudeLines.lines.push({
            climbing: true,
            color: 'red',
            line: [pointToCord(lastPoint, currentTrackingDecimal)],
          }) - 1
      }
    } else {
      if (altitudeLines.lines[currentLineIndex].climbing) {
        currentLineIndex =
          altitudeLines.lines.push({
            climbing: false,
            color: 'green',
            line: [pointToCord(lastPoint, currentTrackingDecimal)],
          }) - 1
      }
    }
    altitudeLines.lines[currentLineIndex].line.push(
      pointToCord(d, currentTrackingDecimal)
    )
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

const pointToCord = (
  d: FlightLocation,
  currentTrackingDecimal: number
): number[] => {
  return [
    parseFloat(d.cord.lattitude.toFixed(currentTrackingDecimal)),
    parseFloat(d.cord.longitude.toFixed(currentTrackingDecimal)),
  ]
}
