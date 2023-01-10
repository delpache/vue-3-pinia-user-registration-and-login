<script setup>
  import { useAuthStore } from '@/stores'
  import { router } from '@/router'

  const authStore = useAuthStore()
  if (authStore.user) {
    router.push('/')
  }
</script>

<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-200 dark:bg-gray-900">
    <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
      <RouterView />
    </div>
  </div>
</template>