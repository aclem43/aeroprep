import { ref, type Ref } from 'vue'

export interface Risk {
  name: string
  score: {
    solo: number
    dual?: number
  }
  use: Ref<boolean>
}

const defualtRisk: Risk[] = [
  { name: 'Less than 10 Hours on type', score: { solo: 2 }, use: ref(false) },
  { name: 'Unfamiliar destination', score: { solo: 1 }, use: ref(false) },
  { name: 'Fatigued', score: { solo: 6 }, use: ref(false) },
  {
    name: 'Recent death of family member',
    score: { solo: 2 },
    use: ref(false),
  },
  { name: 'Major domestic problems', score: { solo: 4 }, use: ref(false) },
  { name: 'Illness in family', score: { solo: 4 }, use: ref(false) },
  { name: 'Cold, Flu, Gastro', score: { solo: 10 }, use: ref(false) },
  { name: 'Alcohol in the last 24 hours', score: { solo: 2 }, use: ref(false) },
  { name: 'Alcohol in the last 12 hours', score: { solo: 4 }, use: ref(false) },
  { name: 'Alcohol in the last 8 hours', score: { solo: -1 }, use: ref(false) },
]

export const getDefualtRiskList = (): Risk[] => {
  return defualtRisk
}
