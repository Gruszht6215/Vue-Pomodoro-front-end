import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

let api_endpoint = process.env.VUE_APP_PET_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: []
    },
    getters: {
        pets: (state) => state.data,
    },
    mutations: {
        fetch(state, { res }) {
            state.data = res.data
        },
        add(state, { payload }) {
            state.data.push(payload)
        },
    },
    actions: {
        async fetchItem({ commit }) {
            let res = await Axios.get(api_endpoint + '/profiles')
            commit('fetch', { res })
        },
        async addItem({ commit }, payload) {
            let url = api_endpoint + '/profiles'
            let body = {
                pet_name: payload.pet_name,
                pet_rarity: payload.pet_rarity,
                pet_point: payload.pet_point,
                pet_image: payload.pet_image
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                commit('add', res.data)
            } else {
                console.error(res)
            }
        },
        async editItem({ commit }, payload) {
            let url = api_endpoint + '/profiles/' + payload.id
            let body = {
                profile_user: 5,
                profile_point: 2500,
                pet_collection: [2, 3]
            }
            let res = await Axios.put(url, body)
            if (res.status === 200) {
                commit('edit', payload.index, res.data)
                console.log("commit('edit')", payload.index, res.data)
            } else {
                console.error(res)
            }
        }

    },
    modules: {}
})