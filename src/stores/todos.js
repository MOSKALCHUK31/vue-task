import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchTodos } from '@/api/index.js'

export const useTodosStore = defineStore('todos-store', () => {
    const todos = ref([])
    const favoritesTodoIds = ref([])

    function SET_TODOS(payload) {
        todos.value = [ ...payload ]
    }
    function SET_FAVORITES_TODO_IDS(payload) {
        favoritesTodoIds.value = [ ...payload ]
    }
    async function GET_TODOS_ACTION() {
        try {
            const { data } = await fetchTodos()

            SET_TODOS(data)
        } catch(err) { console.error(err) }
    }

    return {
        todos,
        favoritesTodoIds,
        SET_FAVORITES_TODO_IDS,
        GET_TODOS_ACTION
    }
})
