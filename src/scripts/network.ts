import { ref, type Ref } from 'vue'
import {
  Network,
  type ConnectionStatus,
  type ConnectionType,
} from '@capacitor/network'

const networkStatus: Ref<ConnectionStatus> = ref({
  connected: false,
  connectionType: 'none' as ConnectionType,
})

const updateStatus = async (status: ConnectionStatus) => {
  networkStatus.value = status
}

Network.addListener('networkStatusChange', updateStatus)

export const getNetworkStatus = (): Ref<ConnectionStatus> => {
  return networkStatus
}
