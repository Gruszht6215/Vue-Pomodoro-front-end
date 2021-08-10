import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"
import AuthUser from '@/store/AuthUser'

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
        },
        async fetchItem({ commit }) {
            let res = await Axios.get(api_endpoint + "/leaderboards")
            commit('fetch', { res })
        },
        async addHistory({ commit }, { point, pointType }) {
            try {
                // console.log("point", point)
                // console.log("pointType", pointType)
                let url_leaderboard = api_endpoint + "/leaderboards"

                var d = new Date();
                //date format = "2021-08-06"
                var datestring =
                    d.getFullYear() +
                    "-" +
                    ("0" + (d.getMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + d.getDate()).slice(-2);
                let body_leaderboard = {
                    user_email: AuthUser.getters.user.email,
                    point_type: pointType,
                    point_amount: point,
                    active_date: datestring,
                }
                // console.log(body_leaderboard)

                let res_leaderboard = await Axios.post(url_leaderboard, body_leaderboard);

                if (res_leaderboard.status === 200) {
                    commit('add', res_leaderboard.data)
                    // console.log(body_leaderboard)
                } else {
                    console.log(res_leaderboard.status)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    },
    modules: {}
})