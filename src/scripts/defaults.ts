import type { Flight, FlightLocation } from '@/models/Flight'
import type { Aircraft } from './aircraft'
import type { Airport } from './airport'
import type { PrepFlight } from './prep/flightaction'
import type { FuelData, FuelRow } from './prep/fuelaction'

// This file is used to define the default values for the script
export const defaultAircraft: Aircraft = {
  name: 'Aircraft',
  fuelBurn: 0,
}

export const defaultFlight: Flight = {
  running: false,
  time: {
    startTime: 0,
    endTime: null,
  },
  aircraft: defaultAircraft,
  flightPath: [],
}

export const defaultFlightLocation: FlightLocation = {
  cord: {
    latitude: 0,
    longitude: 0,
  },
  altitude: 0,
  speed: 0,
  heading: 0,
  time: 0,
}

export const defaultAirport: Airport = {
  code: '',
  home: false,
}

export const defaultCurrentFlight: PrepFlight = {
  dual: true,
  passengers: { pax: false, cfi: false, weight: 0 },
  currentFuel: 0,
  fuelRows: [],
}

export const defaultFuelData: FuelData = {
  litre: 0,
  min: 0,
}

export const defaultFuelRow: FuelRow = {
  item: '',
  name: '',
  fuelData: defaultFuelData,
}
