import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { openAlert } from '../utils/alert'

export const getMapAirspace = async (): Promise<boolean> => {
  const mapAirspaceEnabled = await getSimpleDataByKey(
    'settings_map_airspace_enabled'
  )
  if (mapAirspaceEnabled == null) {
    return true
  }
  return mapAirspaceEnabled == 'true'
}

export const setMapAirspace = async (mapAirspaceEnabled: boolean) => {
  await setSimpleDataByKey(
    'settings_map_airspace_enabled',
    mapAirspaceEnabled,
    true
  )
}

export const getOpenAipApiKey = async (): Promise<string> => {
  const openAipApiKey = await getSimpleDataByKey('settings_openaip_api_key')
  if (openAipApiKey == null) {
    openAlert('OpenAIP API Key not set')
    return ''
  }
  return openAipApiKey
}
export const setOpenAipApiKey = async (openAipApiKey: string) => {
  await setSimpleDataByKey('settings_openaip_api_key', openAipApiKey, true)
}
