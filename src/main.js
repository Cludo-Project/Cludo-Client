import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import Fuse from 'fuse.js'
import Database from './database'

const app = createApp(App)

app.config.globalProperties.$i18n = i18n
const database = new Database(Fuse);
database.load();
app.config.globalProperties.database = database;


app.use(router)
app.use(i18n)
app.mount('#app')
