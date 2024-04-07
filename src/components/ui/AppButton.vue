<template>
    <button :class="['button', `button_size_${ size }`, `button_color_${ color }`]">
        <slot/>
    </button>
</template>

<script setup>
const props = defineProps({
    size: {
        type: String,
        required: true,
        validator: value => ['medium'].includes(value)
    },
    color: {
        type: String,
        required: value => ['green'].includes(value)
    }
})
</script>

<style scoped lang="scss">
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    background: none;
    border: 0;
    border-radius: 10px;
    transition: .3s;
    cursor: pointer;

    &_size {
        &_medium {
            padding-inline: 20px;
            height: 40px;
            font-size: 16px;
            line-height: 24px;
        }
    }

    &_color {
        &_green {
            background: $global-green;
            color: $global-white;

            @media (any-hover: hover) {
                &:hover {
                    background: rgba($global-green, .8);
                }
            }
        }
    }
}
</style>
