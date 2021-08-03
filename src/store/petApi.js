import Vue from 'vue'
import Vuex from 'vuex'

import PetApiJson from '@/store/PetApiJson.json'

const api_endpoint = process.env.VUE_APP_PET_ENDPOINT || "http://localhost:1337"

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
        fetchItem({ commit }) {
            let res = {
                data: PetApiJson,
            }
            commit('fetch', { res })
        },
        addItem({ commit }, payload) {
            commit('add', { payload })
        },

    },
    modules: {}
})