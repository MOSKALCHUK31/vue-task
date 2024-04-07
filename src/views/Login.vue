<template>
    <div class="login-view">
        <div class="login-view__content">
            <LoginForm/>
        </div>
    </div>
</template>

<script setup>
import LoginForm from '@/components/Views/Login/LoginForm.vue'

import { onMounted } from 'vue'
import { userRootStore } from '@/stores/root.js'

const rootStore = userRootStore()

const initUsers = async () => {
    rootStore.TOGGLE_LOADING_STATUS()
    await rootStore.GET_USERS_ACTIONS()
    rootStore.TOGGLE_LOADING_STATUS()
}

onMounted(() => initUsers())
</script>

<style scoped lang="scss">
.login-view {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__content {
        max-width: 400px;
        width: 100%;
    }
}
</style>
