<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/stores';
import { router } from '@/router';
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

const usersStore = useUsersStore();
const route = useRoute();
const id = route.params.id;

let title = 'Aouter un Utilisateur';
let user = null;
if (id) {
  // edit mode
  title = 'Modifier un Utilisateur';
  ({ user } = storeToRefs(usersStore));
  usersStore.getById(id);
}

const schema = Yup.object().shape({
  firstName: Yup.string()
      .required('Le prénom est obligatoire'),
  lastName: Yup.string()
      .required('Le nom est obligatoire'),
  username: Yup.string()
      .required('Le nom d\'utilisateur est obligatoire'),
  email: Yup.string()
      .required('L\'Email est obligatoire'),
  password: Yup.string()
      .transform(x => x === '' ? undefined : x)
      // password optional in edit mode
      .concat(user ? null : Yup.string().required('Le mot de passe est obligatoire'))
      .min(6, 'Le mot de passe doit comporter au moins 6 caractères'),

  confirmPassword: Yup.string()
      .transform(x => x === '' ? undefined : x)
      // password optional in edit mode
      .concat(user ? null : Yup.string().required('Le mot de passe est obligatoire'))
      .min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
});

async function onSubmit(values) {
  try {
    if (user) {
      await usersStore.update(user.value.id, values)
    } else {
      await usersStore.register(values);
    }
    await router.push('/users');
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <h1 class='text-xl mt-20 font-mono font-semibold text-violet-600'>
    {{ title }}
  </h1>
  <div class="w-full mt-10 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
    <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }"
    >
      <div class="grid gap-6 md:grid-cols-2">
        <div>
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required autofocus
          >
          </Field>
          <span class="inline-flex text-sm font-mono text-red-500">{{ errors.lastName }}</span>
        </div>

        <div>
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
              required
          >
          </Field>
          <span class="inline-flex text-sm font-mono text-red-500">{{ errors.firstName }}</span>
        </div>

        <div>
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
              required
          >
          </Field>
          <span class="inline-flex text-sm font-mono text-red-500">{{ errors.username }}</span>
        </div>

        <div>
          <label
              for="email"
              class="block mb-2 text-sm font-mono font-medium text-gray-900 dark:text-white"
          >
            email
          </label>
          <Field
              type="text"
              id="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
          >
          </Field>
          <span class="inline-flex text-sm font-mono text-red-500">{{ errors.email }}</span>
        </div>

        <div>
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

        <div>
          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
          <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
          >
          </Field>
          <span class="inline-flex text-sm font-mono text-red-500">{{ errors.confirmPassword }}</span>
        </div>
      </div>

      <div class='flex items-end'>
        <button
            :disabled="isSubmitting"
            class='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform text-white bg-violet-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800'
        >
          <SpinnerIcon v-show="isSubmitting" />
          Enregistrer
        </button>
      </div>
    </Form>
  </div>
</template>