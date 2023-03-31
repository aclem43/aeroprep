import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import {
  getCurrentDistanceUnit,
  getCurrentLiquidUnit,
} from '../settings/unitsettings'
import { convertLiquidUnit } from '../utils/units/units'

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
  if (!data || data === '[]') {
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
    const metricFuelRows: FuelRow[] = JSON.parse(data)
    const currentFuelRows: FuelRow[] = []
    for (const row of metricFuelRows) {
      convertLiquidUnit
      getCurrentDistanceUnit
      currentFuelRows.push({
        ...row,
        fuelData: {
          litre: convertLiquidUnit(
            row.fuelData.litre,

            'L',
            getCurrentLiquidUnit()
          ),
          min: row.fuelData.min,
        },
      })
    }
    return JSON.parse(data)
  }
}

export const saveFuelRows = async (fuelRows: FuelRow[]) => {
  const metricFuelRows: FuelRow[] = []
  for (const row of fuelRows) {
    convertLiquidUnit
    getCurrentDistanceUnit
    metricFuelRows.push({
      ...row,
      fuelData: {
        litre: convertLiquidUnit(
          row.fuelData.litre,
          getCurrentLiquidUnit(),
          'L'
        ),
        min: row.fuelData.min,
      },
    })
  }
  await setSimpleDataByKey('action_fuel_data', metricFuelRows)
}
