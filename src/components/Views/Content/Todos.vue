<template>
    <div class="todos">
        <div class="todos__title">TODOS</div>
        <div class="todos__heading">
            <div class="todos-heading">
                <div class="todos-heading__item">
                    <label for="status" class="todos-heading__label">Status filter:</label>
                    <AppSelect
                        :options="statusFilterOptions"
                        id="status"
                        @onChange="handleChange($event, 'status')"
                    />
                </div>
                <div class="todos-heading__item">
                    <label for="userId" class="todos-heading__label">UserID filter:</label>
                    <AppSelect
                        :options="userFilterOptions"
                        id="userId"
                        @onChange="handleChange($event, 'userId')"
                    />
                </div>
                <div class="todos-heading__item">
                    <label for="search" class="todos-heading__label">Search by title:</label>
                    <AppInput
                        id="search"
                        size="medium"
                        @onInput="handleChange($event, 'search')"
                    />
                </div>
            </div>
        </div>
        <div class="todos__list">
            <div
                v-for="todo in visibleTodos"
                class="todos__item"
            >
                <div :class="['todo-item', { 'todo-item_favorite': isTodoFavorite(todo.id) }]">
                    <div
                        v-for="[key, value] in Object.entries(todo)"
                         :class="['todo-item__column', { 'todo-item__column_small': isColumnSmall(key) }]"
                    >
                        <div class="todo-item__label">{{ key }}</div>
                        <div class="todo-item__content">{{ value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppSelect from '@/components/ui/AppSelect.vue'

import { ref, computed } from 'vue'
import { getStatusFilterOptions, getUsersFilterOptions } from '@/utils/filter-options.js'
import { useTodosStore } from '@/stores/todos.js'
import { useUserStore } from '@/stores/user.js'
import AppInput from "@/components/ui/AppInput.vue";

const todosStore = useTodosStore()
const userStore = useUserStore()

const filterValues = ref({
    status: 'all',
    userId: 'all',
    search: ''
})

const statusFilterOptions = computed(() => getStatusFilterOptions())
const userFilterOptions = computed(() => getUsersFilterOptions(userStore?.user?.id || 0))
const visibleTodos = computed(() => {
    // filter by search prompt
    const filteredByPromptTodos = filterByPromptTodos(todosStore.todos, filterValues.value.search)
    // filter by status and prompt
    const filteredByStatusAndPromptTodos = filterTodosByStatus(filteredByPromptTodos, filterValues.value.status)
    // filter by userId status and prompt
    return filterTodosByUserId(filteredByStatusAndPromptTodos, filterValues.value.userId)
})

const isColumnSmall = (key) => key === 'id' || key === 'userId'
const isTodoFavorite = (todoId) => false
const handleChange = (targetValue, key) => {
    filterValues.value[key] = targetValue
}
const filterByPromptTodos = (arr, prompt) => {
    if (!prompt.length) return arr

    const value = prompt.trim().toLowerCase()
    return arr.filter(t => t.title.toLowerCase().includes(value))
}
const filterTodosByStatus = (arr, status) => {
    return {
        'all': (todos) => todos,
        'completed': (todos) => todos.filter(t => t.completed),
        'uncompleted': (todos) => todos.filter(t => !t.completed),
        'favorites': (todos) => todos
    }[status](arr)
}
const filterTodosByUserId = (arr, userId) => {
    if (userId === 'all') return arr

    return arr.filter(t => +t.userId === +userId)
}
</script>

<style scoped lang="scss">
.todos {
    &__title {
        margin-bottom: 24px;
        font-size: 32px;
        font-weight: 700;
        left: 48px;
        color: $global-text-color;
        text-align: center;
    }

    &__heading {
        margin-bottom: 32px;
    }

    &__item {
        + .todos__item {
            margin-top: 24px;
        }
    }
}

.todo-item {
    padding: 24px;
    width: 100%;
    display: flex;
    gap: 20px;
    border: 1px solid $global-text-color;
    border-radius: 10px;

    &_favorite {
        border-color: $global-green;
        box-shadow: 5px 5px 5px 0 rgba($global-green, .75);
    }

    &__column {
        width: 100%;

        &_small {
            flex-shrink: 0;
            width: 100px;
        }
    }

    &__label {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: $global-text-color;
    }

    &__content {
        font-size: 18px;
        font-weight: 700;
        line-height: 26px;
        color: $global-black;
    }
}

.todos-heading {
    padding: 24px;
    display: flex;
    gap: 24px;
    border: 1px solid $global-text-color;
    border-radius: 10px;

    &__item {
        width: calc(33.3% - 16px);
    }

    &__label {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: $global-text-color;
    }
}
</style>
