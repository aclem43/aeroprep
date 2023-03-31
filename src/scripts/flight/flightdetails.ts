import type { Flight, FlightLocation } from '@/models/Flight'
import {
  convertToCurrentDistance,
  convertToCurrentHeight,
  convertToCurrentSpeed,
} from '../utils/units/units'
import { getDistanceFromLatLonInNm } from '../utils/gps'

interface FlightDetails {
  averageSpeed: number
  averageAltitude: number
  totalDistance: number
  totalDuration: number
}

export const calculateFlightDetails = (flight: Flight): FlightDetails => {
  let totalPoints = 0
  let totalSpeed = 0
  let totalAltitude = 0
  let totalDistance = 0
  let totalTime = 0
  let lastPoint: FlightLocation | null = null
  for (const point of flight.flightPath) {
    if (lastPoint) {
      totalDistance += convertToCurrentDistance(
        getDistanceFromLatLonInNm(
          lastPoint.cord.lattitude,
          lastPoint.cord.longitude,
          point.cord.lattitude,
          point.cord.longitude
        ),
        'NM'
      )
    }
    if (point.speed) {
      totalSpeed += point.speed
    }
    if (point.altitude) {
      totalAltitude += point.altitude
    }
    totalPoints++
    lastPoint = point
  }

  if (flight.time.startTime && flight.time.endTime) {
    totalTime = flight.time.endTime - flight.time.startTime
  }
  return {
    averageSpeed: convertToCurrentSpeed(totalSpeed / totalPoints, 'MPS'),
    averageAltitude: convertToCurrentHeight(totalAltitude / totalPoints, 'M'),
    totalDistance: totalDistance, // Already in current units
    totalDuration: totalTime,
  }
}
