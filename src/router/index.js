import { createRouter, createWebHistory } from 'vue-router'
import Login from '~/views/Login.vue'
import Content from '~/views/Content.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'login', component: Login },
        { path: '/content', name: 'content', component: Content }
    ]
})

export default router
