import { ref } from 'vue'

const overlay = ref(false)

export const getDevOverlayRef = () => {
  return overlay
}

export const openDevOverlay = () => {
  overlay.value = true
}
