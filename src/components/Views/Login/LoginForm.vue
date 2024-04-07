<template>
    <form
        class="form"
        autocomplete="off"
        @submit.prevent="handleSubmit"
    >
        <div class="form__title">AUTHORIZATION</div>
        <div v-if="formErrorMess" class="form__error">
            {{ formErrorMess }}
        </div>
        <div class="form__row">
            <label class="form__label" for="username">Username</label>
            <AppInput
                :is-error="v$.username.$error"
                size="medium"
                id="username"
                @onInput="handleInput($event, 'username')"
                @onChange="validate($event, 'username')"
            />
        </div>
        <div class="form__row">
            <label class="form__label" for="phone">Phone number</label>
            <AppInput
                :is-error="v$.phone.$error"
                size="medium"
                id="phone"
                @onInput="handleInput($event, 'phone')"
                @onChange="validate($event, 'phone')"
            />
        </div>
        <div class="form__actions">
            <AppButton
                size="medium"
                color="green"
                type="submit"
            >SUBMIT</AppButton>
        </div>
    </form>
</template>

<script setup>
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

import { ref, computed } from 'vue'
import { getLoginValidationRules } from '@/utils/validation-rules.js'
import useVuelidate from '@vuelidate/core'
import { useRootStore } from '@/stores/root.js'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'

const rootStore = useRootStore()
const userStore = useUserStore()
const router = useRouter()

const fields = ref({
    username: '',
    phone: ''
})
const formErrorMess = ref('')

const usersData = computed(() => rootStore.users)
const rules = computed(() => getLoginValidationRules())
const v$ = useVuelidate(rules, fields)

const handleSubmit = () => {
    v$.value.$touch()

    if (v$.value.$invalid) return

    const hasUser = checkUser(fields.value.username, fields.value.phone)

    if (hasUser) {
        setUser()
        router.push('/content')
    } else {
        formErrorMess.value = 'There is no such user'
    }
}
const handleInput = (value, key) => {
    fields.value[key] = value

    if (formErrorMess.value) formErrorMess.value = ''
}
const validate = (value, key) => {
    v$.value[key].$touch()
}
const checkUser = (username, phone) => {
    return usersData.value.some(u => u.username === username && u.phone === phone)
}
const setUser = () => {
    const user = usersData.value.find(u =>
        u.username === fields.value.username
        && u.phone === fields.value.phone
    )

    userStore.SET_USER(user)
    userStore.SET_AUTHENTICATED()
}
</script>

<style scoped lang="scss">
.form {
    padding: 56px;
    border: 1px solid rgba($global-black, .5);
    border-radius: 10px;

    &__title {
        margin-bottom: 32px;
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        color: $global-black;
        text-align: center;
    }

    &__row {
        + .form__row {
            margin-top: 24px;
        }
    }

    &__label {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: $global-text-color;
    }

    &__actions {
        margin-top: 24px;
        display: flex;
        justify-content: center;
    }

    &__error {
        margin-bottom: 24px;
        padding: 24px;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: $global-white;
        border: 1px solid $global-red;
        border-radius: 10px;
        background: rgba($global-red, .5);
    }
}
</style>
