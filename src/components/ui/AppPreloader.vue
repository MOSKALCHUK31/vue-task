<template>
    <div class="preloader">
        <div class="preloader__ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.preloader {
    position: fixed;
    inset: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($global-white, .5);

    &__ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

    &__ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid $global-green;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: $global-green transparent transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }

        &:nth-child(2) {
            animation-delay: -0.3s;
        }

        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
