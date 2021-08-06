import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

// import PetApiJson from '@/store/PetApiJson.json'
let api_endpoint = process.env.VUE_APP_POKEDEX_ENDPOINT || "http://localhost:3000"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: [],
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
        async fetchPet({ commit }) {
            let res = await Axios.get(api_endpoint + "/pets")
            commit('fetch', { res })
        }
    },
    modules: {}
})
