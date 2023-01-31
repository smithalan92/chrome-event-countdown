<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modalRef" title="Settings" @open="onModalOpen" @close="onModalClose">
    <template #body> Hello </template>
    <template #footer>
      <button
        class="outline-none bg-white text-sm py-2 px-4 text-red-600 mr-3 hover:underline rounded cursor-pointer"
        @click="onClickCancel">
        Cancel
      </button>
      <button
        class="outline-none bg-green-600 text-sm py-2 px-4 text-white mr-3 hover:bg-green-700 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        :disabled="!hasText"
        @click="onClickSave">
        Save
      </button>
    </template>
  </ModalBase>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
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

const onClickSave = () => {
  // Do Something
  modalRef.value.close();
};

const onClickCancel = () => {
  modalRef.value.close();
};
</script>
