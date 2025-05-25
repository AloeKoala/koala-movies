import '@/shared/assets/main.css'

import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import App from '@/app/app.vue'
import { router } from '@/app/providers'

const app = createApp(App)

app.use(router)
app.use(ui)

app.mount('#app')
