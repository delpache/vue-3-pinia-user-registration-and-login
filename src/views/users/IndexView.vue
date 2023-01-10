<script setup>
import { storeToRefs } from 'pinia'

import { useUsersStore } from '@/stores'
import PencilIcon from '@/components/icons/PencilIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

usersStore.getAll();
</script>

<template>

    <h3 class="text-sm text-indigo-500 font-mono font-semibold mt-20 mr-20 mb-10">
      Liste des Utilisateurs
    </h3>
    <RouterLink
        to="/users/create"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-20 mr-10 mb-2"
    >
      Ajouter
    </RouterLink>

    <div
        class="overflow-hidden rounded-lg border border-gray-200 shadow-md mt-10 mr-20"
    >
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nom</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Prénoms</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900">Pseudo</th>
          <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
        <template v-if="users.length">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div class="text-sm">
                <div class="text-indigo-500 font-mono font-semibold">
                  {{ user.lastName }}
                </div>
                <div class="text-gray-400 font-mono font-medium">
                  {{ user.email }}
                </div>
              </div>
            </th>
            <td class="px-6 py-4">
              {{ user.firstName }}
            </td>
            <td class="px-6 py-4">
              {{ user.username }}
            </td>
            <td class="px-6 py-4">
              <div class="flex justify-end gap-4">
                <router-link
                   :to="`/users/edit/${user.id}`"
                >
                  <pencil-icon class="text-indigo-700" />
                </router-link>
                <button
                    @click="usersStore.delete(user.id)"
                    :disabled="user.isDisabled"
                >
                  <trash-icon class="text-red-700" />
                </button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

</template>