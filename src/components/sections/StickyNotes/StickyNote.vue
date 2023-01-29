<template>
  <div class="s-sticky-note">
    <div
      class="s-sticky-note__delete"
      @click="deleteNote">
      <close-icon class="s-sticky-note__delete-icon"/>
    </div>
    <div class="s-sticky-note__text">
      <input :value="note.text" class="s-sticky-note__text-input" @input="updateNote"/>
    </div>
  </div>
</template>
<script>
import CloseIcon from '@/assets/icons/close.svg';

export default {
  name: 'StickyNote',

  props: {
    note: {
      type: Object,
      required: true,
    },
  },

  components: {
    CloseIcon,
  },

  methods: {
    deleteNote() {
      this.$emit('delete', this.note.id);
    },

    updateNote(e) {
      const newText = e.target.value;
      this.$emit('update', { noteId: this.note.id, text: newText });
    },
  },
};
</script>
<style lang="scss">
.s-sticky-note {
  position: relative;
  box-sizing: border-box;
  padding: 12px;
  background: rgb(207, 207, 95);
  transform: rotate(5deg);
  min-height: 80px;
  width: 240px;
  box-shadow: 5px 5px 9px -4px #000000;
  margin-right: 16px;
}

.s-sticky-note__delete {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  cursor: pointer;

  &:hover {
    .s-sticky-note__delete-icon {
      fill: rgb(205, 9, 9);
      transform: scale(120%);
    }
  }

  .s-sticky-note__delete-icon {
    fill: rgb(183, 6, 6);
    width: 15px;
    height: 15px;
  }
}

.s-sticky-note__text {
  margin-top: 16px;
}

.s-sticky-note__text-input {
  outline: none;
  border: 0;
  background: transparent;
  width: 100%;
}
</style>
