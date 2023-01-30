import type { Flight, FlightLocation } from '@/models/Flight'
import { Geolocation } from '@capacitor/geolocation'
import { ref, type Ref } from 'vue'
import { getCurrentAircraft } from '../aircraft'
import {
  getAllSimpleDataKeys,
  getSimpleDataByKey,
  setSimpleDataByKey,
} from '../database'
import { getTrackingInterval } from '../settings/settings'

let lastSaveLength = 0
export const defaultTrackingInterval = 5000
const currentFlightData: Ref<Flight | null> = ref(null)
let currentFlightInterval: number = -1

export const getCurrentFlightData = () => {
  return currentFlightData
}

const getCurrentFlightLocation = async (): Promise<FlightLocation> => {
  const geoLoc = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  })
  const flightLoc: FlightLocation = {
    alitude: geoLoc.coords.altitude,
    speed: geoLoc.coords.speed,
    heading: geoLoc.coords.heading,
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
  lastSaveLength += 1
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
  currentFlightData.value = {
    aircraft: aircraft,
    running: true,
    time: { startTime: new Date().getTime(), endTime: null },
    flightPath: [],
  }
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
    if (key.startsWith('flight_save-')) {
      flightKeys.push(key)
    }
  })
  flightKeys.forEach(async (key) => {
    const flight = await getSimpleDataByKey(key)
    if (flight !== null) {
      flights.push(JSON.parse(flight))
    }
  })
  return flights
}
