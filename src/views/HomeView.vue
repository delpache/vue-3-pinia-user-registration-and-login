<script setup>
  import { storeToRefs } from 'pinia';

  import { useAuthStore } from '@/stores';

  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
</script>

<template>
  <div v-if="user" class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <h1 class="text-xl text-indigo-900 font-mono font-medium mt-20 mr-20">
      Hello {{ user.firstName }}!
    </h1>
    <p class="font-mono font-medium mt-2 mr-20">
      Vous êtes connecté avec Vue 3 + Pinia & JWT ! !!
    </p>
    <p class="mt-6">
      <RouterLink
          to="/users"
          class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Gestion des utilisateurs
      </RouterLink>
    </p>
  </div>
</template>
