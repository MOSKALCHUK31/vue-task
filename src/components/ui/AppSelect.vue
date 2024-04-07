<template>
    <select @change="onChange">
        <option
            v-for="option in options"
            :value="option.value"
        >{{ option.name }}</option>
    </select>
</template>

<script setup>
const emit = defineEmits(['onChange'])
const props = defineProps({
    // [{ value, name }]
    options: {
        type: Array,
        required: true
    }
})

const onChange = (e) => emit('onChange', e.target.value)
</script>

<style scoped lang="scss">
select {
    padding-inline: 20px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: $global-text-color;
    border: 1px solid rgba($global-black, .3);
    border-radius: 4px;
    transition: .3s;

    @media (any-hover: hover) {
        &:hover {
            border-color: rgba($global-black, .9);
        }
    }
}
</style>
