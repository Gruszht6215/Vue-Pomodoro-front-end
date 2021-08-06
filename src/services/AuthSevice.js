import Axios from 'axios'
const auth_key = 'auth-pets'
let auth = JSON.parse(localStorage.getItem(auth_key))
const username = auth ? auth.username : ''
const jwt = auth ? auth.jwt : ''

const api_endpoint = process.env.VUE_APP_PET_ENDPOINT || "http://localhost:1337"

export default {
    isAuthen() {
        return (username !== '') && (jwt !== '')
    },
    getUser() {
        return username
    },
    getRole() {
        return username.role.name
    }
}