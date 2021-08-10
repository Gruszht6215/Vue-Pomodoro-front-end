import Axios from "axios"
import ProfileApi from "@/store/ProfileApi";
import AuthUser from "../store/AuthUser";

const auth_key = "auth-account"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""

// const api_endpoint = process.env.VUE_APP_PET_ENDPOINT || "http://localhost:1337"
const api_endpoint = "http://localhost:1337"


//export default = when u wanna use it u have to 'import'
//if dont want to use 'import' u can named it for e.g.) "export const authService = {}"
export default {
    isAuthen() {
        return (user !== "") && (jwt != "")
    },
    getUser() {
        return user
    },
    getJwt() {
        return jwt
    },

    async login({ email, password }) {
        try {
            let url = api_endpoint + "/auth/local"
            let body = {
                identifier: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200", res)
            }
        } catch (e) {
            if (e.response.status === 400) {
                // console.error(e.response.data.message[0].messages[0].message)
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                }
            }
        }
    },
    logout() {
        localStorage.removeItem(auth_key)
    },
    async register({ username, email, password }) {
        try {
            let url = `${api_endpoint}/auth/local/register`
            let body = {
                username: username,
                email: email,
                password: password
            }
            let res = await Axios.post(url, body)
            if (res.status === 200) {
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                //then create Profile for this account 
                let payload = {
                    profile_user: res.data.user.id,
                    profile_point: 0,
                    pet_collection: ""
                }
                ProfileApi.dispatch('addProfile', payload)
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            } else {
                console.log("NOT 200", res)
            }
        } catch (e) {
            if (e.response.status === 400) {
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                }
            } else {
                return {
                    success: false,
                    message: "Unknow error: " + e.response.data
                }
            }
        }
    },
    async receivePoint(profile_id, point) {
        try {
            let url_profile = api_endpoint + "/profiles/" + profile_id
            let url_leaderboard = api_endpoint + "/leaderboards"

            let res_profile = await Axios.get(url_profile)

            if (res_profile.status === 200) {
                let id_pet_collection = res_profile.data.pet_collection.map(it => it.id)
                let totalPoint = parseInt(res_profile.data.profile_point) + parseInt(point)

                let body_profile = {
                    profile_id: profile_id,
                    profile_user: AuthUser.getters.user.id,
                    profile_point: totalPoint,
                    pet_collection: id_pet_collection
                }
                await ProfileApi.dispatch("editProfile", body_profile)
            } else {
                console.log(res_profile)
            }

            var d = new Date();
            //date format = "2021-08-06"
            var datestring =
                d.getFullYear() +
                "-" +
                ("0" + (d.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + d.getDate()).slice(-2);
            let body_leaderboard = {
                user_email: auth.user.email,
                point_type: "Receive",
                point_amount: point,
                active_date: datestring,
            }


            let res_leaderboard = await Axios.post(url_leaderboard, body_leaderboard);

            if (res_leaderboard.status === 200) {
                console.log(body_leaderboard)
            } else {
                console.log(res_leaderboard.status)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}