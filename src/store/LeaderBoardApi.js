import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

// import PetApiJson from '@/store/PetApiJson.json'
let api_endpoint = "http://localhost:1337"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
    },
    getters: {
        leaders: (state) => state.data,
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
        async fetchLeader({ commit }) {
            let res = await Axios.get(api_endpoint + "/leaderboards?_sort=point_amount:DESC")
            commit('fetch', { res })
        }
    },
    modules: {}
})