<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modal" title="Add Note" @open="onModalOpen" @close="onModalClose">
    <template #body>
      <textarea
        ref="textarea"
        v-model="text"
        class="w-full outline-none p-3 border border-solid border-gray-200 text-base rounded"
        rows="10" />
    </template>
    <template #footer>
      <button
        class="outline-none bg-white text-sm py-2 px-4 text-red-600 mr-3 hover:underline rounded cursor-pointer"
        @click="onClickCancel">
        Cancel
      </button>
      <button
        class="outline-none bg-green-600 text-sm py-2 px-4 text-white mr-3 hover:bg-green-700 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        :disabled="!hasText"
        @click="onClickAdd">
        Add
      </button>
    </template>
  </ModalBase>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import ModalBase from './ModalBase.vue';

const modal = ref(null);
const textarea = ref(null);
const text = ref('');
const store = useStore();

const hasText = computed(() => {
  return text.value.trim().length > 0;
});

onMounted(() => {
  store.subscribeAction((action) => {
    const { type } = action;
    if (type === 'openAddStickyNoteModal') {
      modal.value.open();
    }
  });
});

const onModalOpen = () => {
  if (textarea.value) textarea.value.focus();
};

const onModalClose = () => {
  text.value = '';
};

const onClickAdd = () => {
  store.dispatch('addNote', {
    id: Math.floor(Math.random() * Date.now()),
    text: text.value,
  });

  modal.value.close();
};

const onClickCancel = () => {
  modal.value.close();
};
</script>
