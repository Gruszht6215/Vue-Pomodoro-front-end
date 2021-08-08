import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthService from '@/services/AuthService'

let api_endpoint = process.env.VUE_APP_PET_ENDPOINT || "http://localhost:3000"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: []
    },
    getters: {
        profiles: (state) => state.data,
        profile: (state) => (id) => {
            // console.log("state.data.find(pf => pf.id === id)", state.data.find(pf => pf.id === id))
            return state.data.find(pf => pf.id === id)
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
            state.data = data
            console.log("state.data", state.data)
            console.log("asdasdas")
        },
    },
    actions: {
        async fetchItem({ commit }) {
            let res = await Axios.get(api_endpoint + '/profiles')
            commit('fetch', { res })
        },
        async fetchProfile({ commit }, id) {
            let res = await Axios.get(api_endpoint + '/profiles/')
            console.log(res)
            commit('fetch', { res })
        },
        async addItem({ commit }, payload) {
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
            let url = api_endpoint + '/profiles/' + payload.profile_user
            // console.log("payload.profile_point", payload.profile_point)
            let body = {
                profile_user: payload.profile_user,
                profile_point: payload.profile_point,
                pet_collection: payload.pet_collection,
            }
            // console.log("edit body", body)
            let res = await Axios.put(url, body)
            try {
                let url = api_endpoint + "/monsters"
                // let user = AuthService.getUser()
                let body = {
                    profile_user: payload.profile_user,
                    profile_point: payload.profile_point,
                    pet_collection: payload.pet_collection,
                  // user: user.id,
                }
                let headers = AuthService.getApiHeader()
                let res = await Axios.post(url, body, headers)
                if (res.status === 200) {
                  commit("add", res.data)
                  return {
                    success: true,
                    data: res.data
                  }
                } else {
                  console.error(res)
                  return {
                    success: true,
                    message: "Unknown status code: " + res.status
                  }
                }
              } catch (e) {
                console.error(e)
                return {
                  success: false,
                  message: "Unknown error: " + e.response
                }
              }
        }
    },
    modules: {}
})