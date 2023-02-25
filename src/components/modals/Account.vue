<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modalRef" title="Account" @close="onClose">
    <template #body>
      <div class="flex flex-col w-full">
        <template v-if="!isLoggedIn">
          <span class="text-red-500">{{ errorMessage }}</span>
          <label for="email" class="mb-2">Email</label>
          <input v-model="email" name="email" type="email" class="border border-gray-30 rounded py-1 px-2" ref="emailInput" />
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
          <div class="flex flex-col">
            <span>
              Logged in as <span class="font-bold">{{ user?.email }}</span>
            </span>
            <button class="mt-8 border border-solid border-gray-400 rounded p-2 hover:bg-gray-100" @click="onClickLogout">Logout</button>
          </div>
        </template>
      </div>
    </template>
  </ModalBase>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed, nextTick } from 'vue';
import { useAppStore } from '../../store/app';
import ModalBase from './ModalBase.vue';

const modalRef = ref<typeof ModalBase | null>(null);
const store = useAppStore();
const { isLoggedIn, user } = storeToRefs(store);

const email = ref('');
const password = ref('');
const errorMessage = ref<string>('');
const emailInput = ref<HTMLInputElement | null>(null);

const canLogin = computed(() => {
  return email.value.trim().length > 0 && password.value.trim().length > 0;
});

const onClickLogin = async () => {
  if (!canLogin.value) return;
  errorMessage.value = '';
  try {
    await store.login({ email: email.value, password: password.value });
    email.value = '';
    password.value = '';
  } catch (e: any) {
    errorMessage.value = e.message;
  }
};

const onClickLogout = async () => {
  store.logout();
  await nextTick();
  emailInput.value?.focus();
};

const onClose = () => {
  store.closeAccountModal();
};

onMounted(() => {
  emailInput.value?.focus();
});
</script>
