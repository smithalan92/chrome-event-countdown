<!-- eslint-disable vue/no-lone-template -->
<template>
  <ModalBase ref="modal" title="Add Note" @close="onModalClose">
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
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useNoteStore } from '../../store/notes';
import ModalBase from './ModalBase.vue';

const modal = ref<typeof ModalBase | null>(null);
const textarea = ref<HTMLTextAreaElement | null>(null);
const text = ref('');
const store = useNoteStore();

const hasText = computed(() => {
  return text.value.trim().length > 0;
});

onMounted(() => {
  if (textarea.value) textarea.value.focus();
});

const onModalClose = () => {
  store.closeNoteModal();
};

const onClickAdd = () => {
  store.addNote({
    text: text.value,
  });

  store.closeNoteModal();
};

const onClickCancel = () => {
  store.closeNoteModal();
};
</script>
