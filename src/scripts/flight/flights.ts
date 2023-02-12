import type { Flight } from '@/models/Flight'
import {
  getAllSimpleDataKeys,
  getSimpleDataByKey,
  removeSimpleDataByKey,
} from '../database'

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
