import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { lightTheme } from '@/scripts/utils/themes'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      lightTheme,
    },
  },
})

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
