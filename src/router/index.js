import Login from '~/views/Login.vue'
import Error from '@/views/Error.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'login', component: Login },
        {
            path: '/content',
            name: 'content',
            component: () => import('~/views/Content.vue'),
            meta: { requiredAuth: true }
        },
        { path: '/:notFound(.*)', component: Error }
    ]
})

router.beforeEach((to, _2, next) => {
    const userStore = useUserStore()

    if (to.meta.requiredAuth && !userStore.isAuthenticated) {
        next('/404')
    } else {
        next()
    }
})
export default router
