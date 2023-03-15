import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
// Vuetify
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { lightTheme, darkTheme } from '@/scripts/utils/themes'

const vuetify = createVuetify({
  theme: {
    themes: {
      lightTheme,
      darkTheme,
    },
  },
})

import './assets/main.css'
const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(VueClipboard)
app.mount('#app')
