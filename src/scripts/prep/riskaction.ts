import { ref, type Ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'

export interface Risk {
  name: string
  score: {
    solo: number
    dual?: number
  }
}

const currentRiskList: Ref<Risk[]> = ref([])

addInitializer(async () => {
  currentRiskList.value = await getRiskList()
})
const defualtRisk: Risk[] = [
  { name: 'Less than 10 Hours on type', score: { solo: 2 } },
  { name: 'Unfamiliar destination', score: { solo: 1 } },
  { name: 'Fatigued', score: { solo: 6 } },
  {
    name: 'Recent death of family member',
    score: { solo: 2 },
  },
  { name: 'Major domestic problems', score: { solo: 4 } },
  { name: 'Illness in family', score: { solo: 4 } },
  { name: 'Cold, Flu, Gastro', score: { solo: 10 } },
  { name: 'Alcohol in the last 24 hours', score: { solo: 2 } },
  { name: 'Alcohol in the last 12 hours', score: { solo: 4 } },
  { name: 'Alcohol in the last 8 hours', score: { solo: 10 } },
]

export const getDefualtRiskList = (): Risk[] => {
  return defualtRisk
}

export const getRiskList = async (): Promise<Risk[]> => {
  const data = await getSimpleDataByKey('action_risk_data')
  if (!data || data === '[]') {
    return defualtRisk
  } else {
    return JSON.parse(data)
  }
}

export const saveRiskList = async (riskList: Risk[]) => {
  await setSimpleDataByKey('action_risk_data', riskList)
  currentRiskList.value = riskList
}

export const getCurrentRiskList = (): Ref<Risk[]> => {
  return currentRiskList
}
