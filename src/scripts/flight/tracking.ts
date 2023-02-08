import type { Flight, FlightLocation } from '@/models/Flight'
import { Geolocation } from '@capacitor/geolocation'
import { ref, type Ref } from 'vue'
import { getCurrentAircraft } from '../aircraft'
import {
  getAllSimpleDataKeys,
  getSimpleDataByKey,
  removeSimpleDataByKey,
  setSimpleDataByKey,
} from '../database'
import { getTrackingInterval } from '../settings/settings'

let lastSaveLength = 0
export const defaultTrackingInterval = 5000
const currentFlightData: Ref<Flight> = ref({
  running: false,
  time: {
    startTime: 0,
    endTime: null,
  },
  aircraft: { name: 'null', fuelBurn: 0 },
  flightPath: [],
})
let currentFlightInterval: number = -1

export const getCurrentFlightData = () => {
  return currentFlightData
}

const getCurrentFlightLocation = async (): Promise<FlightLocation> => {
  const geoLoc = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  })
  const flightLoc: FlightLocation = {
    alitude: geoLoc.coords.altitude ?? 0,
    speed: geoLoc.coords.speed ?? 0,
    heading: geoLoc.coords.heading ?? 0,
    time: geoLoc.timestamp,
    cord: {
      lattitude: geoLoc.coords.latitude,
      longitude: geoLoc.coords.longitude,
    },
  }
  return flightLoc
}

const recordFlightData = async () => {
  if (
    currentFlightData.value == null ||
    currentFlightData.value.running != true
  ) {
    clearInterval(currentFlightInterval)
    return
  }
  currentFlightData.value.flightPath.push(await getCurrentFlightLocation())
  lastSaveLength = lastSaveLength + 1
  if (lastSaveLength > 5) {
    saveFlight()
    lastSaveLength = 0
  }
}

export const startFlight = async () => {
  const aircraft = getCurrentAircraft().value
  if (aircraft == null) {
    return
  }
  Object.assign(currentFlightData.value, {
    aircraft: aircraft,
    running: true,
    time: { startTime: new Date().getTime(), endTime: null },
    flightPath: [],
  })
  const interval = await getTrackingInterval()
  currentFlightInterval = setInterval(recordFlightData, interval)
}

export const stopFlight = () => {
  if (currentFlightData.value == null) {
    return
  }
  currentFlightData.value.running = false
  currentFlightData.value.time.endTime = new Date().getTime()
  saveFlight()
}

const saveFlight = () => {
  if (currentFlightData.value == null) {
    return
  }
  setSimpleDataByKey(
    `flight_save-${currentFlightData.value.time.startTime}`,
    JSON.stringify(currentFlightData.value)
  )
}

export const getAllPastFlights = async (): Promise<Flight[]> => {
  const keys = await getAllSimpleDataKeys()
  const flightKeys: string[] = []
  const flights: Flight[] = []
  keys.forEach((key) => {
    if (key.startsWith('flight_save')) {
      flightKeys.push(key)
    }
  })
  for (const key of flightKeys) {
    const flight = await getSimpleDataByKey(key)
    flights.push(JSON.parse(flight as string))
  }
  return flights
}

export const deleteFlight = async (flight: Flight) => {
  await removeSimpleDataByKey(`flight_save-${flight.time.startTime}`)
}

export const setCurrentFlight = (flight: Flight) => {
  currentFlightData.value = flight
}
