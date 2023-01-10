import { defineStore } from 'pinia'

export const useToastStore = defineStore({
    id: 'toast',
    state: () => ({
        toast: null
    }),
    actions: {
        success(message) {
            this.toast = {
                message,
                id: 'toast-success',
                type: 'text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200',
                icon: 'Check icon'
            }
        },
        error(message) {
            this.toast = {
                message,
                id: 'toast-danger',
                type: 'text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200',
                icon: 'Error icon'
            }
        },
        clear() {
            this.toast = null
        }
    }
})