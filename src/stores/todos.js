import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchTodos, postTodo } from '@/api/index.js'

export const useTodosStore = defineStore('todos-store', () => {
    const TODOS_STORAGE_KEY = 'FAVORITES_TODO_IDS'
    const todos = ref([])
    const favoritesTodoIds = ref([])

    function SET_TODOS(payload) {
        todos.value = [ ...payload ]
    }
    function SET_FAVORITES_TODO_IDS(payload) {
        favoritesTodoIds.value = [ ...payload ]
    }
    function PUSH_TODO(todoItem) {
        todos.value.unshift(todoItem)
    }
    // STORAGE
    function GET_FAVORITES_TODO_IDS() {
        const json = localStorage.getItem(TODOS_STORAGE_KEY)

        if (!json) return

        SET_FAVORITES_TODO_IDS(JSON.parse(json))
    }
    function ADD_TODO_TO_STORAGE(todoId) {
        const arr = JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []

        arr.push(todoId)
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(arr))

        SET_FAVORITES_TODO_IDS(arr)
    }
    function REMOVE_TODO_FROM_STORAGE(todoId) {
        const json = localStorage.getItem(TODOS_STORAGE_KEY)
        const arr = JSON.parse(json)
        const filteredTodoIds = arr.filter(t => +t !== todoId)

        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(filteredTodoIds))

        SET_FAVORITES_TODO_IDS(filteredTodoIds)
    }
    // ACTIONS
    async function GET_TODOS_ACTION() {
        try {
            const { data } = await fetchTodos()

            SET_TODOS(data)
        } catch(err) { console.error(err) }
    }
    async function ADD_TODO_ACTION(payload) {
        try {
            const { data } = await postTodo(payload)

            PUSH_TODO(data)
        } catch(err) { console.error(err) }
    }

    return {
        todos,
        favoritesTodoIds,
        GET_FAVORITES_TODO_IDS,
        ADD_TODO_TO_STORAGE,
        REMOVE_TODO_FROM_STORAGE,
        GET_TODOS_ACTION,
        ADD_TODO_ACTION
    }
})
