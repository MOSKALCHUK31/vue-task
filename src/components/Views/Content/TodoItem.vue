<template>
    <div :class="['todo-item', { 'todo-item_favorite': isTodoFavorite }]">
        <div
            v-for="[key, value] in Object.entries(todo)"
            :class="['todo-item__column', { 'todo-item__column_small': isColumnSmall(key) }]"
        >
            <div class="todo-item__label">{{ key }}</div>
            <div class="todo-item__content">{{ value }}</div>
        </div>
        <div class="todo-item__column todo-item__column_small">
            <div class="todo-item__label">Favorites</div>
            <AppButton
                :color="buttonColor"
                size="medium"
                @onClick="handleClick(todo.id)"
            >{{ buttonLabel }}</AppButton>
        </div>
    </div>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import { computed } from 'vue'

const emit = defineEmits(['handleFavorites'])
const props = defineProps({
    todo: {
        type: Object,
        required: true
    },
    isTodoFavorite: {
        type: Boolean,
        required: true
    }
})

const buttonLabel = computed(() => props.isTodoFavorite ? 'REMOVE' : 'ADD')
const buttonColor = computed(() => props.isTodoFavorite ? 'red' : 'green')

const isColumnSmall = (key) => key === 'id'
    || key === 'userId'
    || key === 'completed'
const handleClick = (todoId) => emit('handleFavorites', todoId)
</script>

<style scoped lang="scss">
.todo-item {
    padding: 24px;
    width: 100%;
    display: flex;
    gap: 20px;
    border: 1px solid $global-text-color;
    border-radius: 10px;
    transition: .3s;

    &_favorite {
        border-color: $global-green;
        box-shadow: 5px 5px 5px 0 rgba($global-green, .5);
    }

    &__column {
        width: 100%;

        &_small {
            flex-shrink: 0;
            width: 120px;
        }
    }

    &__label {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: $global-text-color;
    }

    &__content {
        font-size: 18px;
        font-weight: 700;
        line-height: 26px;
        color: $global-black;
    }
}
</style>
