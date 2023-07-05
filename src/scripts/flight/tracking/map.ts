import type { Flight, FlightLocation } from '@/models/Flight'
import { logger } from '@/scripts/utils/logger'
import { convertToCurrentDistance } from '@/scripts/utils/units/units'
import { computed } from 'vue'

import { getCurrentFlightData } from './recording'
import {
  getCurrentLineColor,
  getCurrentLineModeRef,
  getCurrentRateOfClimb,
  getCurrentTrackingDecimal,
} from './trackingConstants'

export const generateLine = computed((): number[][] | AltitudeLine => {
  const flight = getCurrentFlightData().value
  const lineMode = getCurrentLineModeRef()
  if (lineMode.value == 'basic') {
    const line = generateBasicLine(flight)
    logger.log('Generated line: ' + line.toString())
    return line
  }
  const line = generateAltitudeLines(flight)
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
type Direction = 'cruise' | 'ascending' | 'descending'
export interface AltitudeLine {
  lines: {
    color?: string
    direction: Direction
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
  const colors = getCurrentLineColor()
  if (flight.flightPath.length == 0) {
    logger.log('No Points Recorded Yet')
    return altitudeLines
  }
  let lastPoint = flight.flightPath[0]
  let currentLineIndex = 0
  altitudeLines.lines.push({
    direction: 'cruise',
    color: colors.cruise,
    line: [],
  })
  flight.flightPath.forEach((d: FlightLocation) => {
    checkIfNull(d)
    const rateInfo = calculateRateOfClimb(lastPoint, d)
    if (Math.abs(rateInfo.rate) > currentRateOfClimb) {
      if (
        altitudeLines.lines[currentLineIndex].direction != rateInfo.direction
      ) {
        currentLineIndex =
          altitudeLines.lines.push({
            direction: rateInfo.direction,
            color:
              rateInfo.direction == 'descending'
                ? colors.descending
                : colors.ascending,
            line: [pointToCord(lastPoint, currentTrackingDecimal)],
          }) - 1
      }
    } else {
      if (altitudeLines.lines[currentLineIndex].direction) {
        currentLineIndex =
          altitudeLines.lines.push({
            direction: 'cruise',
            color: colors.cruise,
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
): { rate: number; direction: Direction } => {
  const time = point2.time - point1.time
  if (point1.altitude == null || point2.altitude == null) {
    logger.warn('Altitude Is Null')
    return { rate: 0, direction: 'ascending' }
  }
  const altitude = convertToCurrentDistance(
    point2.altitude - point1.altitude,
    'M'
  )
  const rateOfClimb = altitude / new Date(time).getMinutes()

  if (rateOfClimb < 0) {
    return { rate: rateOfClimb, direction: 'descending' }
  } else {
    return { rate: rateOfClimb, direction: 'ascending' }
  }
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
