import Axios from 'axios'
import { useUsers } from '../stores/user'
import router from '../router'

const axios = Axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            const store = useUsers()
            store.$reset()
            if (!store.userLogin.remember) {
                store.userLogin = {}
            }
            store.userData = {}
            store.authStatus = []
            router.push({ name: 'login' })
        } else if (error.response.status === 404) {
            router.push({ name: 'page-not-found' })
        }
        throw error;
    })


export default axios
