import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ui from '@nuxt/ui/vue-plugin'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

const app = createApp(App)

// Define your routes
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/' },
  { path: '/:catchAll(.*)', redirect: '/' }
];

// Create the router instance with createWebHashHistory
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

app.use(router)
app.use(ui)

app.mount('#app')
