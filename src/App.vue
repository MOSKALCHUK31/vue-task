<template>
    <div id="root">
        <RouterView/>
        <transition name="opacity">
            <AppPreloader v-if="rootStore.isLoading"/>
        </transition>
    </div>
</template>

<script setup>
import AppPreloader from '@/components/ui/AppPreloader.vue'
import { useRootStore } from '@/stores/root.js'

const rootStore = useRootStore()
</script>
