import { devMode } from '../settings/devTools'

const version: string = APP_VERSION

export const getVersion = (): string => {
  if (devMode) {
    return version + '-dev'
  }
  return version
}
