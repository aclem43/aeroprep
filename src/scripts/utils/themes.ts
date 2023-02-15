import { ref, type Ref } from 'vue'
import type { ThemeDefinition } from 'vuetify'
import { addInitializer } from '../initialize'
import { getTheme } from '../settings/settings'

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#f7f7f7',
    primary: '#1877f2',
    'primary-darken-1': '#3700B3',
    secondary: '#12a60d',
    'secondary-darken-1': '#018786',
    'gray-variant': '#474747',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    primary: '#0b039e',
    'primary-darken-1': '#3700B3',
    secondary: '#12a60d',
    'secondary-darken-1': '#018786',
    'gray-variant': '#212121',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}
export type ThemeType = 'darkTheme' | 'lightTheme'

const currentTheme: Ref<ThemeType> = ref('darkTheme')

export const getCurrentTheme = () => {
  return currentTheme
}

export const setCurrentTheme = (theme: ThemeType) => {
  currentTheme.value = theme
}

const initalizeTheme = async () => {
  const savedTheme = await getTheme()
  if (savedTheme == null) {
    return
  }
  setCurrentTheme(savedTheme)
}

addInitializer(initalizeTheme)
