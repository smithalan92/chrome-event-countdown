<template>
  <div
    class="relative border-box p-3 pb-4 bg-yellow-200 rotate-[5deg] min-h-[80px] w-[440px] drop-shadow-lg mr-4 shrink-0"
  >
    <div
      class="absolute top-0 right-0 p-2 cursor-pointer hover:scale-[120%]"
      @click="deleteNote"
    >
      <close-icon class="fill-red-700 w-4 h-4" />
    </div>
    <div class="mt-4">
      <textarea
        :value="note.text"
        class="outline-none border-0 w-full bg-transparent min-h-[50px] max-h-[300px]"
        @input="updateNote"
      />
    </div>
  </div>
</template>
<script>
import CloseIcon from "../../assets/icons/close.svg";

export default {
  name: "StickyNote",

  components: {
    CloseIcon,
  },

  props: {
    note: {
      type: Object,
      required: true,
    },
  },

  emits: ["delete", "update"],

  methods: {
    deleteNote() {
      this.$emit("delete", this.note.id);
    },

    updateNote(e) {
      const newText = e.target.value;
      this.$emit("update", { noteId: this.note.id, text: newText });
    },
  },
};
</script>
