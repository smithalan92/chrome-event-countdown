<template>
  <div class="s-sticky-note">
    <div
      class="s-sticky-note__delete"
      @click="deleteNote">
      <close-icon class="s-sticky-note__delete-icon"/>
    </div>
    <div class="s-sticky-note__text">
      {{ note.text }}
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
</style>
