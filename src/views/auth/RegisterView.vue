<script setup>
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'

import { useUsersStore, useToastStore } from '@/stores'
import { router } from '@/router'
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue"

const schema = Yup.object().shape({
  firstName: Yup.string()
      .required('Le prénom est obligatoire'),
  lastName: Yup.string()
      .required('Le nom est obligatoire'),
  username: Yup.string()
      .required('Le nom d\'utilisateur est obligatoire'),
  password: Yup.string()
      .required('Le mot de passe est obligatoire')
      .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  const toastStore = useToastStore();
  try {
    await usersStore.register(values);
    await router.push('/auth/login');
    toastStore.success('Vous êtes inscrit avec succès');
  } catch (error) {
    toastStore.error(error);
  }
}
</script>

<template>
  <h1 class='text-xl font-mono font-semibold text-violet-600'>
    Inscription
  </h1>

  <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
  >
    <div class="mt-5">
      <label
          for="lastName"
          class="block mb-2 text-sm font-mono font-medium text-gray-900 dark:text-white"
      >
        Nom
      </label>
      <Field
          type="text"
          id="lastName"
          name="lastName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'inline-flex text-sm font-mono text-red-500': errors.lastName }"
          required autofocus
      >
      </Field>
      <span class="inline-flex text-sm font-mono text-red-500">{{ errors.lastName }}</span>
    </div>

    <div class="mt-2">
      <label
          for="firstName"
          class="block mb-2 text-sm font-mono font-medium text-gray-900 dark:text-white"
      >
        Prénoms
      </label>
      <Field
          type="text"
          id="firstName"
          name="firstName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :class="{ 'inline-flex text-sm font-mono text-red-500': errors.firstName }"
          required
      >
      </Field>
      <span class="inline-flex text-sm font-mono text-red-500">{{ errors.firstName }}</span>
    </div>

    <div class="mt-2">
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
          :class="{ 'inline-flex text-sm font-mono text-red-500': errors.username }"
          required
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
          :class="{ 'inline-flex text-sm font-mono text-red-500': errors.password }"
          required
      >
      </Field>
      <span class="inline-flex text-sm font-mono text-red-500">{{ errors.password }}</span>
    </div>

    <div class='mt-2 flex flex-col gap-y-4'>
      <button
          :disabled="isSubmitting"
          class='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3 bg-violet-500 rounded-full text-white font-mono font-bold text-sm'
      >
        <SpinnerIcon v-show="isSubmitting" />
        Inscription
      </button>
    </div>

    <div class='mt-4 flex justify-center items-center'>
      <p class='font-medium font-mono text-sm'>Vous avez déjà un compte ?</p>
      <RouterLink
          to="login"
          class='ml-2 font-mono font-medium text-sm text-violet-500'
      >
        Connectez-vous
      </RouterLink>
    </div>
  </Form>
</template>