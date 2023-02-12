import type { FlightLocation } from '@/models/Flight'
import { getDistanceFromLatLonInNm } from '@/scripts/utils/gps'
import { getCurrentFlightData } from './recording'

const currentFlightData = getCurrentFlightData()

const getLastFlightLocation = () => {
  const flightPathLength = currentFlightData.value.flightPath.length
  return currentFlightData.value.flightPath[flightPathLength - 1]
}
export const verifyFlightLocation = (
  flightLocation: FlightLocation
): boolean => {
  const lastLocation = getLastFlightLocation()

  const distance = getDistanceFromLatLonInNm(
    lastLocation.cord.lattitude,
    lastLocation.cord.longitude,
    flightLocation.cord.lattitude,
    flightLocation.cord.longitude
  )
  return true
}
