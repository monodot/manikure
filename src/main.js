import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Add the following code snippet to your application before any other JavaScript/TypeScript code!
// For example put the code in your root index.[ts|js] file, right before you initialize your SPA / App.

import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

var faro = initializeFaro({
  url: process.env.FARO_API_URL,
  app: {
    name: 'manikure',
    version: '1.0.0',
    environment: process.env.FARO_APP_ENVIRONMENT
  },
  instrumentations: [
    // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
    ...getWebInstrumentations(),

    // Initialization of the tracing package.
    // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
    new TracingInstrumentation(),
  ],
});


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
