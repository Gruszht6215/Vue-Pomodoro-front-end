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
        profiles: (state) => state.data,
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
        async fetchProfile({ commit }) {
            let res = await Axios.get(api_endpoint + "/profiles")
            commit('fetch', { res })
        },
        async addPet({ commit }, payload) {

            let url = api_endpoint + "/profiles"
            let body = {
                profile_name: payload.profile_name,
                profile_point: payload.profile_point,
                pet_collection: payload.pet_collection,
            }
            let res = await Axios.post(url,body)
            if(res.status === 200){
                commit('add',res.data)
            } else {
                comsole.error(res)
            }
        },
        async editPet({ commit}, payload){
            let url = api_endpoint + "/profiles" + payload.id
            let body = {
                profile_name: payload.profile_name,
                profile_point: payload.profile_point,
                pet_collection: payload.pet_collection,
            }
            let res = await Axios.put(url,body)
            if(res.status === 200){
            console.log("commit('edit')", payload.index, res.data)
            commit("edit", payload.index, res.data)
        }else{
            console.err(res)
        }
        }
    },
    modules: {}
})
