<template>
  <div>
    <div
      class="absolute bottom-[30px] right-[30px] flex justify-center items-center w-12 h-12 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700"
      @click="togglePopover">
      <plus-icon class="w-5 h-50 fill-white" />
    </div>
    <div v-if="isPopoverOpen" v-click-outside="togglePopover" class="absolute bottom-[75px] right-[10px] bg-white py-4 rounded text-base">
      <ul class="list-none m-0 p-0">
        <li class="border-b border-solid border-gray-100">
          <button class="w-full py-4 px-8 border-0 cursor-pointer hover:bg-gray-100 outline-none" @click="openAddEvent">Add Event</button>
        </li>
        <li>
          <button class="w-full py-4 px-8 border-0 cursor-pointer hover:bg-gray-100 outline-none" @click="openAddNote">Add Note</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import PlusIcon from '../../assets/icons/plus.svg';

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
