<template>
  <div v-if="isOverlayVisible" class="m-add-sticky-note__overlay">
    <transition name="slideDown">
      <div
        v-if="isVisible"
        v-click-outside="close"
        class="m-add-sticky-note"
        style="animation-duration: 0.5s"
      >
        <div class="m-add-sticky-note__header">
          <div class="m-add-sticky-note__header-title">Add Sticky Note</div>
          <div class="m-add-sticky-note__header-close" @click="close">
            <close-icon class="m-add-sticky-note__header-close-icon" />
          </div>
        </div>
        <div class="m-add-sticky-note__body">
          <textarea
            ref="textarea"
            v-model="text"
            class="m-add-sticky-note__textarea"
            rows="10"
          ></textarea>
        </div>
        <div class="m-add-sticky-note__footer">
          <button
            class="m-add-sticky-note__button m-add-sticky-note__button--cancel"
            @click="onClickCancel"
          >
            Cancel
          </button>
          <button
            class="m-add-sticky-note__button m-add-sticky-note__button--add"
            :disabled="!hasText"
            @click="onClickAdd"
          >
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
import { GlobalEvents } from "vue-global-events";
import CloseIcon from "../../../assets/icons/close.svg";

export default {
  name: "AddStickyNote",

  components: {
    GlobalEvents,
    CloseIcon,
  },

  data() {
    return {
      isVisible: false,
      text: "",
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
      if (type === "openAddStickyNoteModal") {
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
      this.text = "";
    },

    onClickAdd() {
      this.$store.dispatch("addNote", {
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
<style lang="scss">
.m-add-sticky-note__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(white, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.m-add-sticky-note {
  display: flex;
  flex-direction: column;
  width: 400px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.m-add-sticky-note__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(228, 228, 228);
  height: 20px;
  font-weight: 600;
  font-size: 22px;
}

.m-add-sticky-note__header-close {
  padding: 4px;
  cursor: pointer;

  .m-add-sticky-note__header-close-icon {
    fill: #474747;
    width: 20px;
    height: 20px;
  }

  &:hover {
    .m-add-sticky-note__header-close-icon {
      fill: rgba(#474747, 0.8);
    }
  }
}

.m-add-sticky-note__body {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  flex: 1;
}

.m-add-sticky-note__textarea {
  outline: none;
  padding: 12px;
  border: 1px solid rgb(209, 206, 206);
  font-size: 16px;
  border-radius: 4px;
}

.m-add-sticky-note__footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid rgb(228, 228, 228);
}

.m-add-sticky-note__button {
  cursor: pointer;
  outline: 0;
  background: #fff;
  font-size: 13px;
  padding: 5px 20px;
  border: 0;

  &:disabled {
    background: rgb(92, 92, 92) !important;
    cursor: not-allowed;
  }

  &:hover {
    text-decoration: underline;
  }

  &--add {
    background: rgb(19, 152, 19);
    border-radius: 4px;
    color: #fff;

    &:hover {
      text-decoration: none;
      background: rgba(19, 152, 19, 0.8);
    }
  }

  &--cancel {
    color: red;
    margin-right: 10px;
  }
}
</style>
