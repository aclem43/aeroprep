import { ref, type Component } from 'vue'

import FlightActionVue from '@/components/prep/actions/FlightAction.vue'
import FuelActionVue from '@/components/prep/actions/FuelAction.vue'
import WeightBalanceActionVue from '@/components/prep/actions/WeightBalanceAction.vue'
import RiskActionVue from '@/components/prep/actions/RiskAction.vue'
import NoteActionVue from '@/components/prep/actions/NoteAction.vue'
import WeatherActionVue from '@/components/prep/actions/WeatherAction.vue'
const page = ref()

const pages: Page[] = [
  {
    name: 'Flight',
    shortName: 'flight',
    icon: 'mdi-airplane',
    component: FlightActionVue,
  },
  {
    name: 'Fuel',
    shortName: 'fuel',
    icon: 'mdi-gas-station',
    component: FuelActionVue,
  },
  {
    name: 'Weight & Balance',
    shortName: 'weight',
    icon: 'mdi-balance-scale',
    component: WeightBalanceActionVue,
  },
  {
    name: 'Risk Assment',
    shortName: 'risk',
    icon: 'mdi-order-bool-ascending-variant',
    component: RiskActionVue,
  },
]

const morePages: Page[] = [
  {
    name: 'Notes',
    shortName: 'notes',
    icon: 'mdi-note-text',
    component: NoteActionVue,
  },
  {
    name: 'Weather',
    shortName: 'weather',
    icon: 'mdi-weather-cloudy',
    component: WeatherActionVue,
  },
]

export const getPages = () => {
  return { pages, morePages }
}
export const getPage = () => {
  return page
}

export interface Page {
  name: string
  shortName: string
  icon?: string
  component: Component
}
