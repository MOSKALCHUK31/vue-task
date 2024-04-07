import $axios from 'axios'

const apiBase = import.meta.env.VITE_API_BASE

export const apiBaseFetch = $axios.create({
    baseURL: apiBase,
    headers: {
        "Content-Type": "application/hal+json",
        Accept: "application/json"
    }
})

export const fetchUsers = () => apiBaseFetch.get(`/users`)
