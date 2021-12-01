import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  /*{
    path: '/profil',
    name: 'Profil',
    component: Profil
  },*/
  {
    path: '/profil/:userId',
    name: 'UserProfil',
    component: Profil
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
