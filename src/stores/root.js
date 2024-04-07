import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUsers } from '@/api/index.js'

export const useRootStore = defineStore('root-store', () => {
    const users = ref([])
    const isLoading = ref(false)

    function SET_USERS(payload) {
        users.value = payload
    }
    function TOGGLE_LOADING_STATUS() {
        isLoading.value = !isLoading.value
    }
    async function GET_USERS_ACTIONS() {
        try {
            const { data } = await fetchUsers()

            SET_USERS(data)
        } catch(err) { console.error(err) }
    }

    return {
        users,
        isLoading,
        TOGGLE_LOADING_STATUS,
        GET_USERS_ACTIONS
    }
})
