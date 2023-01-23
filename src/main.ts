import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { lightTheme, darkTheme } from '@/scripts/utils/themes'

// Open Layers
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

const vuetify = createVuetify({
  components,
  directives,
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
app.use(OpenLayersMap)
app.mount('#app')
