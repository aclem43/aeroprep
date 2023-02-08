import { ref, type Ref } from 'vue'

export interface PrepFlight {
  dual: Ref<boolean>
  passengers: Ref<{ pax: boolean; cfi: boolean; weight: number }>
  fuel: Ref<{ leftTank: number; rightTank: number }>
}

const currentFlight: PrepFlight = {
  dual: ref(true),
  passengers: ref({ pax: false, cfi: false, weight: 0 }),
  fuel: ref({ leftTank: 0, rightTank: 0 }),
}

export const getCurrentFlight = (): PrepFlight => {
  return currentFlight
}