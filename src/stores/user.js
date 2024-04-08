import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user-store', () => {
    // const user = ref(null)
    const user = ref(null)
    const isAuthenticated = ref(false)

    function SET_AUTHENTICATED() {
        isAuthenticated.value = true
    }

    function SET_USER(payload) {
        user.value = payload
    }

    return {
        isAuthenticated,
        user,
        SET_AUTHENTICATED,
        SET_USER
    }
})
