<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modalRef" title="Account">
    <template #body>
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
        <template v-else> Logged in as {{ user?.email }} </template>
      </div>
    </template>
  </ModalBase>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAppStore } from '../../store/app';
import ModalBase from './ModalBase.vue';

const modalRef = ref<typeof ModalBase | null>(null);
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

onMounted(() => {
  store.$onAction(({ name }) => {
    if (name === 'openSettingsModal') {
      modalRef.value!.open();
    }
  });
});
</script>
