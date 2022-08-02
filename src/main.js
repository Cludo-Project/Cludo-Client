import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import Fuse from 'fuse.js'

const app = createApp(App)

app.config.globalProperties.$i18n = i18n
// TODO: Instantiate the database here
app.config.globalProperties.$fuse = Fuse

app.use(router)
app.use(i18n)
app.mount('#app')
