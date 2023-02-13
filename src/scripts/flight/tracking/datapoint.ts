import type { FlightLocation } from '@/models/Flight'
import { getDistanceFromLatLonInNm } from '@/scripts/utils/gps'
import { getCurrentFlightData } from './recording'
import {
  getCurrentHeadingChange,
  getCurrentMinimumDistance,
} from './trackingConstants'

const getLastFlightLocation = () => {
  const currentFlightData = getCurrentFlightData()
  const flightPathLength = currentFlightData.value.flightPath.length
  return currentFlightData.value.flightPath[flightPathLength - 1]
}
export const verifyFlightLocation = (
  currentFlightLocation: FlightLocation
): boolean => {
  const lastLocation = getLastFlightLocation()
  if (!lastLocation) {
    return true
  }
  const distance = getDistanceFromLatLonInNm(
    lastLocation.cord.lattitude,
    lastLocation.cord.longitude,
    currentFlightLocation.cord.lattitude,
    currentFlightLocation.cord.longitude
  )
  const currentMinimumDistance = getCurrentMinimumDistance()
  const currentHeadingChange = getCurrentHeadingChange()
  if (distance > currentMinimumDistance) {
    return true
  }
  if (lastLocation.heading != null && currentFlightLocation.heading != null) {
    if (
      lastLocation.heading - currentFlightLocation.heading <=
        currentHeadingChange ||
      lastLocation.heading - currentFlightLocation.heading >=
        currentHeadingChange
    ) {
      return true
    }
  }
  return false
}
