<template>
  <div class="s-sticky-notes">
    <StickyNote
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @delete="deleteNote"
      @update="updateNote"
    />
  </div>
</template>
<script>
import StickyNote from "./StickyNote.vue";

export default {
  name: "StickyNotes",

  components: {
    StickyNote,
  },

  computed: {
    notes() {
      return this.$store.state.notes;
    },
  },

  methods: {
    deleteNote(noteId) {
      this.$store.dispatch("removeNote", noteId);
    },

    updateNote({ noteId, text }) {
      this.$store.dispatch("updateNote", { noteId, text });
    },
  },
};
</script>
<style lang="scss">
.s-sticky-notes {
  position: absolute;
  width: 100vw;
  display: flex;
  top: 0;
  left: 0;
  padding: 24px;
  display: flex;
  overflow-x: scroll;
}
</style>
