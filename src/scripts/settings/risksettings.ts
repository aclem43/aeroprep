import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
const defaultMaxRiskScore = 7
const defualtWarnRiskScore = 4

export const getMaxRiskScore = async (): Promise<number> => {
  const maxRiskScore = await getSimpleDataByKey('settings_max_risk_score')
  if (maxRiskScore == null) {
    return defaultMaxRiskScore
  }
  return parseInt(maxRiskScore)
}

export const setMaxRiskScore = async (maxRiskScore: number) => {
  await setSimpleDataByKey('settings_max_risk_score', maxRiskScore)
}

export const getWarnRiskScore = async (): Promise<number> => {
  const warnRiskScore = await getSimpleDataByKey('settings_warn_risk_score')
  if (warnRiskScore == null) {
    return defualtWarnRiskScore
  }
  return parseInt(warnRiskScore)
}

export const setWarnRiskScore = async (warnRiskScore: number) => {
  await setSimpleDataByKey('settings_warn_risk_score', warnRiskScore)
}
