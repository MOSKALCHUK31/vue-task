<template>
    <div class="content-view">
        <div class="content-view__inner">
            <div class="content-view__user">
                <UserData/>
            </div>
            <div class="content-view__todos">
                <Todos/>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserData from '@/components/Views/Content/UserData.vue'
import Todos from '@/components/Views/Content/Todos.vue'

import { onMounted } from 'vue'
import { useRootStore } from '@/stores/root.js'
import { useTodosStore } from '@/stores/todos.js'

const rootStore = useRootStore()
const todosStore = useTodosStore()

const initTodos = async () => {
    rootStore.TOGGLE_LOADING_STATUS()
    await todosStore.GET_TODOS_ACTION()
    rootStore.TOGGLE_LOADING_STATUS()
}

onMounted(() => initTodos())
</script>

<style scoped lang="scss">
.content-view {
    &__inner {
        margin-inline: auto;
        padding: 100px 0;
        max-width: 900px;
        width: 100%;
    }

    &__user {
        margin-bottom: 96px;
    }
}
</style>
