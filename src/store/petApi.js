import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import swal from 'sweetalert'

//import PetApiJson from '@/store/PetApiJson.json'

let api_endpoint = "http://localhost:1337"

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
        edit(state, res) {
            state.data[res.index] = res.response
            // state.data[res.index].pet_name = res.response.pet_name
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
            let url = api_endpoint + '/pets/' + payload.id
            let upload_url = api_endpoint + '/upload'

            if (payload.pet_image === null) {
                let body = {
                    pet_name: payload.pet_name,
                    pet_rarity: payload.pet_rarity,
                    pet_point: payload.pet_point,
                }
                let res = await Axios.put(url, body)
                if (res.status === 200) {
                    let resData = {
                        index: payload.index,
                        response: res.data
                    }
                    commit("edit", resData)
                    swal("Update Success!", "", "success")
                } else {
                    console.error(res)
                }
            } else {
                let res_upload = await Axios.post(upload_url, payload.pet_image)
                if (res_upload.status === 200) {
                    const imageId = res_upload.data[0].id;
                    let body = {
                        pet_name: payload.pet_name,
                        pet_rarity: payload.pet_rarity,
                        pet_point: payload.pet_point,
                        pet_image: imageId,
                    }
                    let res = await Axios.put(url, body)
                    if (res.status === 200) {
                        let resData = {
                            index: payload.index,
                            response: res.data
                        }
                        commit("edit", resData)
                        swal("Update Success!", "", "success")
                    } else {
                        console.error(res)
                    }
                } else {
                    console.error(res)
                }
            }
        },

    },
    modules: {}
})