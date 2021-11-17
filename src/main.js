import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const myApp = createApp(App)
myApp.use(BootstrapVue)
myApp.mount('#app')
