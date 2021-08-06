import Axios from "axios"

const auth_key = "auth-account"
let auth = JSON.parse(localStorage.getItem(auth_key))
const user = auth ? auth.user : ""
const jwt = auth ? auth.jwt : ""

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
                console.log(res.data.user.role.name)
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


}