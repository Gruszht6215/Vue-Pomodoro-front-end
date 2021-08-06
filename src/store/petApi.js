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
        },
        async addPet({ commit }, payload) {

            let url = api_endpoint + "/pets"
            let body = {
                pet_name: payload.pet_name,
                pet_rarity: payload.pet_rarity,
                pet_point: payload.pet_point,
                pet_image: payload.pet_image
            }
            let res = await Axios.post(url,body)
            if(res.status === 200){
                commit('add',res.data)
            } else {
                comsole.error(res)
            }
        },
        async editPet({ commit}, payload){
            let url = api_endpoint + "/pets/" + payload.id
            let body = {
                pet_name: payload.pet_name,
                pet_rarity: payload.pet_rarity,
                pet_point: payload.pet_point,
                pet_image: payload.pet_image
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
