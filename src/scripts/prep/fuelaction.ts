import { getSimpleDataByKey, setSimpleDataByKey } from '../database'

export interface FuelRow {
  item: string
  name: string
  fuelData: FuelData
}

export interface FuelData {
  min: number
  litre: number
}

const initFuelData = (): FuelData => {
  return {
    min: 0,
    litre: 0,
  }
}

export const initFuelRows = async (): Promise<FuelRow[]> => {
  const data = await getSimpleDataByKey('action_fuel_data')
  if (!data) {
    return [
      { item: 'A', name: 'Taxi Fuel', fuelData: initFuelData() },
      { item: 'B', name: 'Trip Fuel', fuelData: initFuelData() },
      {
        item: 'C',
        name: 'Varible Reserve (__% if B)',
        fuelData: initFuelData(),
      },
      { item: 'D', name: 'Alternate Fuel', fuelData: initFuelData() },
      { item: 'E', name: 'Fixed Reserve', fuelData: initFuelData() },
      { item: 'F', name: 'Additional Fuel', fuelData: initFuelData() },
      { item: 'G', name: 'Holding Fuel', fuelData: initFuelData() },
    ]
  } else {
    return JSON.parse(data)
  }
}

export const saveFuelRows = async (fuelRows: FuelRow[]) => {
  await setSimpleDataByKey('action_fuel_data', JSON.stringify(fuelRows))
}
