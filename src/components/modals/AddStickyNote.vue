<template>
  <div v-if="isOverlayVisible" class="absolute top-0 left-0 w-screen h-screen bg-white/20 flex justify-center items-center">
    <transition name="slideDown">
      <div v-if="isVisible" v-click-outside="close" class="flex flex-col w-96 bg-white p-6 rounded" style="animation-duration: 0.5s">
        <div class="flex justify-between items-center pb-3">
          <div class="font-bold text-l">Add Sticky Note</div>
          <div class="p-1 cursor-pointer hover:opacity-80" @click="close">
            <close-icon class="fill-gray-600 w-5 h-5" />
          </div>
        </div>
        <div class="flex flex-col py-2 flex-1">
          <textarea
            ref="textarea"
            v-model="text"
            class="outline-none p-3 border border-solid border-gray-200 text-base rounded"
            rows="10"></textarea>
        </div>
        <div class="flex justify-end pt-5">
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
        </div>
      </div>
    </transition>
    <global-events @keydown.esc="close" />
  </div>
</template>
<script>
/* eslint-disable func-names */
import { GlobalEvents } from 'vue-global-events';
import CloseIcon from '../../assets/icons/close.svg';

export default {
  name: 'AddStickyNote',

  components: {
    GlobalEvents,
    CloseIcon,
  },

  data() {
    return {
      isVisible: false,
      text: '',
      isOverlayVisible: false,
    };
  },

  computed: {
    hasText() {
      return this.text.trim().length > 0;
    },
  },

  mounted() {
    this.$store.subscribeAction((action) => {
      const { type } = action;
      if (type === 'openAddStickyNoteModal') {
        this.open();
      }
    });
  },

  methods: {
    async open() {
      this.isOverlayVisible = true;
      await this.$nextTick();
      this.isVisible = true;
      await this.$nextTick();
      if (this.$refs.textarea) this.$refs.textarea.focus();
    },

    async close() {
      this.isVisible = false;
      await this.$nextTick();
      this.isOverlayVisible = false;
      this.text = '';
    },

    onClickAdd() {
      this.$store.dispatch('addNote', {
        id: Math.floor(Math.random() * Date.now()),
        text: this.text,
      });

      this.close();
    },

    onClickCancel() {
      this.close();
    },
  },
};
</script>
