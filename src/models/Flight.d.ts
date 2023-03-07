import type { Aircraft } from '@/scripts/aircraft'

export interface Flight {
  running: boolean
  time: {
    startTime: number
    endTime: number | null
  }
  aircraft: Aircraft
  flightPath: FlightLocation[]
}

export interface FlightLocation {
  time: number
  cord: {
    lattitude: number
    longitude: number
  }
  speed: number | null
  altitude: number | null
  heading: number | null
}
