import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from "../views/Game.vue";
import About from "../views/About.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
]

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes
})

export default router
