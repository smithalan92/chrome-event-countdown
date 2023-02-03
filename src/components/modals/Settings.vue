<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modalRef" title="Settings" @open="onModalOpen" @close="onModalClose">
    <template #body>
      <Login />
    </template>
  </ModalBase>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Login from '../sections/Login.vue';
import ModalBase from './ModalBase.vue';

const modalRef = ref(null);
const store = useStore();

onMounted(() => {
  store.subscribeAction((action) => {
    const { type } = action;
    if (type === 'openSettingsModal') {
      modalRef.value.open();
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
