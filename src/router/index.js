import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reward from '@/views/Reward'
import Login from '@/views/auth/Login.vue'
import Logout from '@/views/auth/Logout.vue'
import Register from '@/views/auth/Register.vue'
import LeaderBoard from '@/views/LeaderBoard.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/reward',
  name: 'Reward',
  component: Reward,
},
{
  path: '/login',
  name: 'Login',
  component: Login
},
{
  path: '/logout',
  name: 'Logout',
  component: Logout
},
{
  path: '/register',
  name: 'Register',
  component: Register
},
{
  path: '/profile',
  name: 'Profiles',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
},
{
  path: '/leaderboard',
  name: 'LeaderBoard',
  component: LeaderBoard
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router