import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthService from '@/services/AuthService'

let api_endpoint = "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: []
    },
    getters: {
        profiles: (state) => state.data,
        // profile: (state) => (id) => {
        //     // console.log("state.data.find(pf => pf.id === id)", state.data.find(pf => pf.id === id))
        //     return state.data.find(pf => pf.id === id)
        // },
        profile: (state) => (username_auth) => {
            console.log("username_auth", username_auth)
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].profile_user.username == username_auth) {
                    return state.data[i]
                }
            }
        },
    },
    mutations: {
        fetch(state, { res }) {
            state.data = res.data
        },
        add(state, { payload }) {
            state.data.push(payload)
        },
        edit(state, data) {
            console.log(state.data)
            state.data = data
            console.log(state.data)

            // console.log("state.data", state.data)
        },
    },
    actions: {
        async fetchItem({ commit }) {
            let res = await Axios.get(api_endpoint + '/profiles')
            commit('fetch', { res })
        },
        async fetchProfile({ commit }, id) {
            let res = await Axios.get(api_endpoint + '/profiles/' + id)
            commit('fetch', { res })
        },
        async addProfile({ commit }, payload) {
            let url = api_endpoint + '/profiles'
            let body = {
                profile_user: payload.profile_user,
                profile_point: payload.profile_point,
                pet_collection: payload.pet_collection,
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                commit('add', res.data)
            } else {
                console.error(res)
            }
        },
        async editProfile({ commit }, payload) {
            let url = api_endpoint + '/profiles/' + payload.profile_id
                // console.log("payload.profile_point", payload.profile_user)
            let body = {
                profile_user: payload.profile_user,
                profile_point: payload.profile_point,
                pet_collection: payload.pet_collection,
            }

            let res = await Axios.put(url, body)

            if (res.status === 200) {
                commit('edit', res.data)
                console.log("commit('edit')", res.data)
            } else {
                console.error(res)
            }
        }
    },
    modules: {}
})