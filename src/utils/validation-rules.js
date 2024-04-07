import {
    required,
    alpha,
    numeric,
    minLength
} from '@vuelidate/validators'

const numericAndSymbols = (value) => /^[0-9\W]+$/.test(value)
export function getLoginValidationRules() {
    return {
        username: {
            required,
            alpha
        },
        phone: {
            required,
            numericAndSymbols
        }
    }
}

export function getTodoValidationRules() {
    return {
        userId: {
            required,
            numeric
        },
        title: {
            required,
            minLength: minLength(5)
        }
    }
}
