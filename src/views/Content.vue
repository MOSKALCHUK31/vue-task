<template>
    <div class="content-view">
        <div class="content-view__inner">
            <div class="content-view__user">
                <UserData/>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserData from '@/components/Views/Content/UserData.vue'
</script>

<style scoped lang="scss">
.content-view {
    &__inner {
        margin-inline: auto;
        padding: 100px 0;
        max-width: 900px;
        width: 100%;
    }
}
</style>
