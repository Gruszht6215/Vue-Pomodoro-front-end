import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '../services/AuthService'

Vue.use(Vuex)

let auth_key = 'auth-account'
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.user : "",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
    state: initialState,
    mutations: {
        loginSuccess(state, user, jwt) {
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
        },
        logoutSuccess(state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            let res = await AuthService.login({ email, password })
            if (res.success) {
                //change state begin, send res.user & res.jwt
                commit('loginSuccess', res.user, res.jwt)
            }
            return res
        },
        async logout({ commit }) {
            AuthService.logout()
            commit('logoutSuccess')
        }
    },
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen
    },
    modules: {
    }
})
