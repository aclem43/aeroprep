import { ref, type Ref } from 'vue'
import {
  Network,
  type ConnectionStatus,
  type ConnectionType,
} from '@capacitor/network'
import { addInitializer } from './initialize'

const networkStatus: Ref<ConnectionStatus> = ref({
  connected: false,
  connectionType: 'none' as ConnectionType,
})

const updateStatus = async (status: ConnectionStatus) => {
  networkStatus.value = status
}
const initializeStatus = async () => {
  networkStatus.value = await Network.getStatus()
}

Network.addListener('networkStatusChange', updateStatus)

addInitializer(initializeStatus)
export const getNetworkStatus = (): Ref<ConnectionStatus> => {
  return networkStatus
}
