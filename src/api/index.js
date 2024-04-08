import $axios from 'axios'

const apiBase = import.meta.env.VITE_API_BASE

export const apiBaseFetch = $axios.create({
    baseURL: apiBase,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json"
    }
})
export const fetchUsers = () => apiBaseFetch.get('/users')

export const fetchTodos = () => apiBaseFetch.get('/todos')
export const postTodo = (payload) => apiBaseFetch.post('/todos', payload)

