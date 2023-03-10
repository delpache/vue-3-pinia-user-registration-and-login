<script setup>
  import { Form, Field } from 'vee-validate'
  import * as Yup from 'yup'

  import { useAuthStore } from '@/stores'
  import GoogleButton from "@/components/buttons/GoogleButton.vue"
  import SpinnerIcon from "@/components/icons/SpinnerIcon.vue"

  const schema = Yup.object().shape({
    username: Yup.string().required('Le nom d\'utilisateur est obligatoire'),
    password: Yup.string().required('Le mot de passe est obligatoire')
  })

  async function onSubmit(values) {
    const authStore = useAuthStore()
    const { username, password } = values
    await authStore.login(username, password)
  }

</script>

<template>
  <h1 class='text-xl font-mono font-semibold text-violet-600'>
    Connexion
  </h1>

  <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
  >
    <div class="mt-5">
      <label
          for="username"
          class="block mb-2 text-sm font-mono font-medium text-gray-900 dark:text-white"
      >
        Nom utilisateur
      </label>
      <Field
          type="text"
          id="username"
          name="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required autofocus
      >
      </Field>
      <span class="inline-flex text-sm font-mono text-red-500">{{ errors.username }}</span>
    </div>

    <div class="mt-2">
      <label
          for="password"
          class="block mb-2 text-sm font-mono font-medium text-gray-900 dark:text-white"
      >
        Mot de passe
      </label>
      <Field
          type="password"
          id="password"
          name="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
      >
      </Field>
      <span class="inline-flex text-sm font-mono text-red-500">{{ errors.password }}</span>
    </div>

    <!-- Remember Me -->
    <div class="block mt-2">
      <label for="remember_me" class="inline-flex items-center">
        <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-violet-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
        <span class="ml-2 text-sm font-mono text-gray-600 dark:text-gray-400">
              Se souvenir de moi
            </span>
      </label>
    </div>

    <div class='mt-4 flex flex-col gap-y-4'>
      <button
          :disabled="isSubmitting"
          class='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3 bg-violet-500 rounded-full text-white font-mono font-bold text-sm'
      >
        <SpinnerIcon v-show="isSubmitting" />
        Se connecter
      </button>
      <GoogleButton>
        Se connecter avec Google
      </GoogleButton>
    </div>

    <div class='mt-4 flex justify-center items-center'>
      <p class='font-medium font-mono text-sm'>Vous n'avez pas de compte ?</p>
      <RouterLink
          to="register"
          class='ml-2 font-mono font-medium text-sm text-violet-500'
      >
        Inscrivez-vous
      </RouterLink>
    </div>
  </Form>
</template>