import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Reward from '@/views/Reward'
import Login from '@/views/auth/Login.vue'
import Logout from '@/views/auth/Logout.vue'
import Register from '@/views/auth/Register.vue'
import LeaderBoard from '@/views/LeaderBoard.vue'
import Profile from '@/views/Profile.vue'
import CreatePet from '@/views/pet/CreatePet.vue'

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
        name: 'Profile',
        component: Profile
    },
    {
        path: '/leaderboard',
        name: 'LeaderBoard',
        component: LeaderBoard
    },
    {
        path: '/createPet',
        name: 'CreatePet',
        component: CreatePet
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router