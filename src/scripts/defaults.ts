import type { Flight, FlightLocation } from '@/models/Flight'
import type { Aircraft } from './aircraft'
import type { Airport } from './airport'
import type { PrepFlight } from './prep/flightaction'
import type { FuelData, FuelRow } from './prep/fuelaction'

// This file is used to define the default values for the script
export const defaultAircraft = (): Aircraft => {
  return {
    name: 'Aircraft',
    fuelBurn: 0,
  }
}

export const defaultFlight = (): Flight => {
  return {
    running: false,
    time: {
      startTime: 0,
      endTime: null,
    },
    aircraft: defaultAircraft(),
    flightPath: [],
  }
}

export const defaultFlightLocation = (): FlightLocation => {
  return {
    cord: {
      latitude: 0,
      longitude: 0,
    },
    altitude: 0,
    speed: 0,
    heading: 0,
    time: 0,
  }
}

export const defaultAirport = (): Airport => {
  return {
    code: '',
    home: false,
  }
}

export const defaultCurrentFlight = (): PrepFlight => {
  return {
    dual: true,
    passengers: { pax: false, cfi: false, weight: 0 },
    currentFuel: 0,
    fuelRows: [],
  }
}

export const defaultFuelData = (): FuelData => {
  return {
    min: 0,
    litre: 0,
  }
}

export const defaultFuelRow = (): FuelRow => {
  return {
    item: '',
    name: '',
    fuelData: defaultFuelData(),
  }
}
