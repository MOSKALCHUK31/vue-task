<template>
    <div class="user-data" >
        <div class="user-data__title">USER DATA</div>
        <div class="user-data__row">
            <div class="user-data__label">ID:</div>
            <div class="user-data__content">{{ user.id }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Name:</div>
            <div class="user-data__content">{{ user.name }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Username:</div>
            <div class="user-data__content">{{ user.username }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Email:</div>
            <div class="user-data__content">{{ user.email }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Phone:</div>
            <div class="user-data__content">{{ user.phone }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Website:</div>
            <div class="user-data__content">{{ user.website }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Address:</div>
            <div class="user-data__content">{{ getAddress(user.address).address }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Address geo:</div>
            <div class="user-data__content">{{ getAddress(user.address).geo }}</div>
        </div>
        <div class="user-data__row">
            <div class="user-data__label">Company:</div>
            <div class="user-data__content">{{ getCompany(user.company) }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.js'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const getAddress = ({ suite, street, city, zipcode, geo }) => {
    return {
        address: `${ suite }, ${ city }, ${ street }, ${ zipcode }`,
        geo: `lat: ${ geo.lat }, lng: ${ geo.lng }`
    }
}
const getCompany = ({ bs, catchPhrase, name }) => {
    return `${ name }, ${ bs }, ${ catchPhrase }`
}
</script>

<style scoped lang="scss">
.user-data {
    padding: 48px;
    border: 1px solid $global-text-color;
    border-radius: 10px;

    &__title {
        margin-bottom: 24px;
        font-size: 32px;
        font-weight: 700;
        left: 48px;
        color: $global-text-color;
        text-align: center;
    }

    &__row {
        display: flex;
        gap: 24px;

        + .user-data__row {
            margin-top: 16px;
        }
    }

    &__label {
        width: calc(50% - 12px);
        flex-shrink: 0;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: $global-black;
    }

    &__contnet {
        width: calc(50% - 12px);
        flex-shrink: 0;
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        color: $global-text-color;
    }
}
</style>
