<template>
  <div class="relative border-box p-3 pb-4 bg-yellow-200 rotate-[5deg] min-h-[80px] w-[200px] drop-shadow-lg mr-4 shrink-0">
    <div class="absolute top-0 right-0 p-2 cursor-pointer hover:scale-[120%]" @click="deleteNote">
      <close-icon class="fill-red-700 w-4 h-4" />
    </div>
    <div class="mt-4">
      <textarea
        :value="note.text"
        class="text-sm outline-none border-0 w-full bg-transparent min-h-[50px] max-h-[200px]"
        @input="updateNote" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CloseIcon from '../../assets/icons/close.svg?component';

const props = defineProps<{
  note: any;
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void;
  (e: 'update', { id, text }: { id: number; text: string }): void;
}>();

const deleteNote = () => {
  emit('delete', props.note.id);
};

const updateNote = (e: Event) => {
  const newText = (e.target as HTMLTextAreaElement).value;
  emit('update', { id: props.note.id, text: newText });
};
</script>
