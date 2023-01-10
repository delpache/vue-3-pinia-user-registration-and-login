import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useToastStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // Initialiser l'état du stockage local pour permettre à l'utilisateur de rester connecté.
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });

                // Mutation du state de Pinia
                this.user = user;

                // Stocker les détails de l'utilisateur et le jwt dans le stockage local
                // pour garder l'utilisateur connecté entre les rafraîchissements de la page.
                localStorage.setItem('user', JSON.stringify(user));

                // Redirige vers l'url précédente ou vers la page d'accueil par défaut
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useToastStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');

            router.push('/auth/login');
        }
    }
});