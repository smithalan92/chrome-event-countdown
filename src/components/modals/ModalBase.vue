<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-white/20 flex justify-center items-center">
    <transition name="slideDown">
      <div v-click-outside="close" class="flex flex-col w-96 bg-white px-6 py-4 rounded relative" style="animation-duration: 0.5s">
        <div class="flex justify-between items-center pb-3">
          <div class="font-bold text-xl">{{ props.title }}</div>
          <div class="absolute top-[10px] right-[10px] p-1 cursor-pointer hover:opacity-80" @click="close">
            <close-icon class="fill-gray-600 w-6 h-6" />
          </div>
        </div>
        <div class="flex flex-col py-2 flex-1">
          <slot name="body"></slot>
        </div>
        <div class="flex justify-end pt-2">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
    <global-events @keydown.esc="close" />
  </div>
</template>
<script setup lang="ts">
import { GlobalEvents } from 'vue-global-events';
import CloseIcon from '../../assets/icons/close.svg?component';

const props = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = async () => {
  emit('close');
};
</script>
