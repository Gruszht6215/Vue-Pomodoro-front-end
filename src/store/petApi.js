import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthService from '@/services/AuthService'
//import PetApiJson from '@/store/PetApiJson.json'

let api_endpoint = "http://localhost:3000"

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
        async fetchItem({ commit }) {
            let res = await Axios.get(api_endpoint + '/pets')
            commit('fetch', { res })
        },
        async fetchPet({ commit }) {
            let res = await Axios.get(api_endpoint + "/pets")
            commit('fetch', { res })
        },
        async addItem({ commit }, payload) {
            let url = api_endpoint + '/pets'
            let upload_url = api_endpoint + '/upload'

            let res_upload = await Axios.post(upload_url, payload.pet_image)
            if (res_upload.status === 200) {
                const imageId = res_upload.data[0].id;

                let body = {
                    pet_name: payload.pet_name,
                    pet_rarity: payload.pet_rarity,
                    pet_point: payload.pet_point,
                    pet_image: imageId,
                    profile_owner: []
                }
                let res = await Axios.post(url, body)
                if (res.status === 200) {
                    commit('add', res.data)
                    swal("Upload Success!", "", "success")
                } else {
                    console.error(res)
                }
            } else {
                console.error(res)
            }
        },
        async editItem({ commit }, payload) {
            let url = api_endpoint + '/pets' + payload.id
            let body = {
                pet_name: payload.pet_name,
                pet_rarity: payload.pet_rarity,
                pet_point: payload.pet_point,
                pet_image: payload.pet_image
            }
            let res = await Axios.put(url, body)
            if (res.status === 200) {
                commit('edit', payload.index, res.data)
                console.log("commit('edit')", payload.index, res.data)
            } else {
                console.error(res)
            }
        },

    },
    modules: {}
})