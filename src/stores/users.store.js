import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'
import { useAuthStore } from '@/stores'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),

    actions: {
        async register(user) {
            await fetchWrapper.post(`${baseUrl}/register`, user)
        },

        async getAll() {
            this.users = { loading: true }
            try {
                this.users = await fetchWrapper.get(baseUrl)
            } catch (error) {
                this.users = { error }
            }
        },

        async getById(id) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.user = { error };
            }
        },

        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // mettre à jour l'utilisateur enregistré si l'utilisateur connecté
            // a mis à jour son propre enregistrement
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // Mise à jour du local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // Mise à jour de l'utilisateur auth dans l'état de pinia
                authStore.user = user;
            }
        },

        async delete(id) {
            // Ajouter la propriété isDeleting à l'utilisateur en cours de suppression
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // Supprimer un utilisateur de la liste après l'avoir supprimé
            this.users = this.users.filter(x => x.id !== id);

            // Déconnexion automatique si l'utilisateur connecté a supprimé son propre enregistrement
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
})