<template>
    <input
        :class="[`size_${ size }`, { 'is-error': isError }]"
        v-model="value"
        type="text"
        @input="onInput"
        @change="onChange"
    >
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onInput', 'onChange'])
const props = defineProps({
    size: {
        type: String,
        required: true,
        validator: value => ['medium'].includes(value)
    },
    isError: {
        type: Boolean,
        required: false
    }
})

const value = ref('')

const onInput = (e) => emit('onInput', e.target.value)
const onChange = (e) => emit('onChange', e.target.value)
</script>

<style scoped lang="scss">
input {
    width: 100%;
    font-weight: 400;
    color: $global-text-color;
    border: 1px solid rgba($global-black, .3);
    border-radius: 4px;
    transition: .3s;

    &:focus {
        border-color: rgba($global-black, .9);
    }

    &.is-error {
        color: $global-red;
        border-color: $global-red;
    }

    &.size {
        &_medium {
            padding-inline: 20px;
            height: 40px;
            font-size: 16px;
            line-height: 24px;
        }
    }
}
</style>
