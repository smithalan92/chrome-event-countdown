<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modalRef" title="Settings" @open="onModalOpen" @close="onModalClose">
    <template #body>
      <Login />
    </template>
  </ModalBase>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAppStore } from '../../store/app';
import Login from '../sections/Login.vue';
import ModalBase from './ModalBase.vue';

const modalRef = ref<typeof ModalBase | null>(null);
const store = useAppStore();

onMounted(() => {
  store.$onAction(({ name }) => {
    if (name === 'openSettingsModal') {
      modalRef.value!.open();
    }
  });
});

const onModalOpen = () => {
  // Do something
};

const onModalClose = () => {
  // Do something
};
</script>
