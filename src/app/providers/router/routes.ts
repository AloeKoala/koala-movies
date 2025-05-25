import { DefaultLayout } from '@/app/layouts'
import { HomePage } from '@/pages/home'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      layout: DefaultLayout,
    },
  },
]
