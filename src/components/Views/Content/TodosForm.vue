<template>
    <form
        ref="form"
        class="todos-form"
        @submit.prevent="handleSubmit"
    >
        <div class="todos-form__row">
            <label for="create-todo-user-id" class="todos-form__label">UserID</label>
            <AppInput
                :is-error="v$.userId.$error"
                size="medium"
                type="number"
                id="create-todo-user-id"
                @onInput="handleInput($event, 'userId')"
                @onChange="validate($event, 'userId')"
            />
        </div>
        <div class="todos-form__row">
            <label for="create-todo-title" class="todos-form__label">Title</label>
            <AppInput
                :is-error="v$.title.$error"
                size="medium"
                id="create-todo-title"
                @onInput="handleInput($event, 'title')"
                @onChange="validate($event, 'title')"
            />
        </div>
        <div class="todos-form__actions">
            <AppButton
                color="green"
                size="medium"
                type="submit"
            >CREATE TODO</AppButton>
        </div>
    </form>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'

import { ref, computed } from 'vue'
import { getTodoValidationRules } from '@/utils/validation-rules.js'
import useVuelidate from '@vuelidate/core'
import { useRootStore } from '@/stores/root.js'
import { useTodosStore } from '@/stores/todos.js'

const rootStore = useRootStore()
const todosStore = useTodosStore()

const form = ref(null)
const fields = ref({
    userId: '',
    title: ''
})

const rules = computed(() => getTodoValidationRules())
const v$ = useVuelidate(rules, fields)

const handleInput = (targetValue, key) => fields.value[key] = targetValue
const validate = (value, key) => v$.value[key].$touch()
const handleSubmit = async () => {
    v$.value.$touch()

    if (v$.value.$invalid) return

    const payload = { ...fields.value, completed: false }

    rootStore.TOGGLE_LOADING_STATUS()
    await todosStore.ADD_TODO_ACTION(payload)
    rootStore.TOGGLE_LOADING_STATUS()

    form.value.reset()
}
</script>

<style scoped lang="scss">
.todos-form {
    padding: 24px;
    display: flex;
    align-items: flex-end;
    gap: 24px;
    border: 1px solid $global-text-color;
    border-radius: 10px;

    &__row {
        width: 100%;
    }

    &__actions {
        flex-shrink: 0;
    }
}
</style>
