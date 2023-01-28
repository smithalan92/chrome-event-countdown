<template>
  <div class="w-add-popover__add-event">
    <div
      class="w-add-popover__button"
      @click="togglePopover">
      <plus-icon class="w-add-popover__add-event-icon"/>
    </div>
    <div class="w-add-popover__popup" v-if="isPopoverOpen" v-click-outside="togglePopover">
      <ul>
        <li @click="openAddEvent">Add Event</li>
        <li @click="openAddNote">Add Note</li>
      </ul>
    </div>
  </div>
</template>
<script>
import PlusIcon from '@/assets/icons/plus.svg';

export default {
  name: 'AddPopover',

  components: {
    PlusIcon,
  },

  data() {
    return {
      isPopoverOpen: false,
    };
  },

  methods: {
    openAddEvent() {
      this.$store.dispatch('openAddEventModal');
      this.isPopoverOpen = false;
    },

    openAddNote() {
      this.$store.dispatch('openAddStickyNoteModal');
      this.isPopoverOpen = false;
    },

    togglePopover() {
      this.isPopoverOpen = !this.isPopoverOpen;
    },
  },
};
</script>
<style lang="scss">
.w-add-popover__button {
    position: absolute;
    bottom: 30px;
    right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: #474747;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        .w-add-popover__add-event-icon {
            fill: rgba(#fff, 0.7);
        }
    }

    .w-add-popover__add-event-icon {
        width: 20px;
        height: 20px;
        fill: #fff;
    }
}

.w-add-popover__popup {
  position: absolute;
  bottom: 75px;
  right: 10px;
  background: #fff;
  padding: 16px 0;
  border-radius: 4px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 16px 32px;
    cursor: pointer;

    &:hover {
      background-color: darken(white, 10%);
    }
  }
}
</style>
