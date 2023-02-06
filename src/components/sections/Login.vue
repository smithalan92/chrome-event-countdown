<template>
  <div class="flex flex-col w-full">
    <template v-if="!isLoggedIn">
      <label for="email" class="mb-2">Email</label>
      <input v-model="email" name="email" type="email" class="border border-gray-30 rounded py-1 px-2" />
      <label for="email" class="mt-4 mb-2">Password</label>
      <input v-model="password" name="password" type="password" class="border border-gray-30 rounded py-1 px-2" />
      <button
        class="outline-none bg-green-600 text-sm py-2 px-4 text-white mt-4 hover:bg-green-700 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        :disabled="!canLogin"
        @click="onClickLogin">
        Login
      </button>
    </template>
    <template v-else>
      {{ user }}
    </template>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useAppStore } from '../../store';

const store = useAppStore();
const email = ref('');
const password = ref('');

const user = computed(() => {
  return store.user;
});

const isLoggedIn = computed(() => {
  return user.value !== null;
});

const canLogin = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0;
});

const onClickLogin = () => {
  if (!canLogin.value) return;
  store.login({ email: email.value, password: password.value });
};
</script>
