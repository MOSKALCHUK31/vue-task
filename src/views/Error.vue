<template>
    <div class="error">
        <h1 class="error__title">You are attempting to reach authorized page or smt went wrong!</h1>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
.error {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__title {
        font-size: 32px;
        font-weight: 700;
        line-height: 48px;
    }
}
</style>
