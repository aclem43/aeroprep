import type { Flight, FlightLocation } from '@/models/Flight'
import { getCurrentAircraft } from '@/scripts/aircraft'
import { setSimpleDataByKey } from '@/scripts/database'
import { getTrackingInterval } from '@/scripts/settings/settings'
import { KeepAwake } from '@capacitor-community/keep-awake'
import { Geolocation } from '@capacitor/geolocation'
import { type Ref, ref } from 'vue'

let lastSaveLength = 0

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

  if (await KeepAwake.isSupported()) {
    await KeepAwake.keepAwake()
  }
}

export const stopFlight = async () => {
  if (currentFlightData.value == null) {
    return
  }
  currentFlightData.value.running = false
  currentFlightData.value.time.endTime = new Date().getTime()
  saveFlight()
  if (await KeepAwake.isSupported()) {
    await KeepAwake.allowSleep()
  }
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

export const setCurrentFlight = (flight: Flight) => {
  currentFlightData.value = flight
}
