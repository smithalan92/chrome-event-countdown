<template>
  <div
    class="c-add-event__overlay"
    v-if="isOverlayVisible">
    <transition name="slideDown">
      <div
        class="c-add-event"
        style="animation-duration: 0.5s"
        v-if="isVisible">
        <div class="c-add-event__header">
          <div class="c-add-event__header-title">
            Add New Event
          </div>
          <div class="c-add-event__header-close">
            <close-icon class="c-add-event__header-close-icon"/>
          </div>
        </div>
        <div class="c-add-event__body">
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Name</span>
            <input
              class="c-add-event__input"
              type="text"
              v-model="eventName"/>
          </div>
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Date</span>
            <datetime
              type="datetime"
              v-model="eventDate"/>
          </div>
          <div class="c-add-event__row">
            <span class="c-add-event__label">Image</span>
            <div class="c-add-event__input-extra">
              <input
                class="c-add-event__input"
                type="url"
                v-model="eventBackgroundImage"/>
              <span class="c-add-event__input-label">
                Paste a URL to an image here. If empty, a random image will be used.
              </span>
            </div>
          </div>
          <transition name="zoom">
            <div
              class="c-add-event__image-preview"
              v-if="eventBackgroundImage">
              <img
                class="c-add-event__image"
                :src="eventBackgroundImage"/>
            </div>
            </transition>
        </div>
        <div class="c-add-event__footer">
          <div
            class="c-add-event__button c-add-event__button--cancel"
            @click="onClickCancel">
            Cancel
          </div>
          <div
            class="c-add-event__button c-add-event__button--add"
            @click="onClickAdd">
            Add
          </div>
        </div>
      </div>
    </transition>
    <global-events
      @keydown.esc="close"/>
  </div>
</template>
<script>
import { Datetime } from 'vue-datetime';
import GlobalEvents from 'vue-global-events'
import CloseIcon from './Icons/Close.vue';
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'AddEvent',

  components: {
    GlobalEvents,
    Datetime,
    CloseIcon,
  },

  data() {
    return {
      isVisible: false,
      eventName: '',
      eventDate: '',
      eventBackgroundImage: '',
      isOverlayVisible: false,
    };
  },

  methods: {
    async open() {
      this.isOverlayVisible = true;
      await this.$nextTick();
      this.isVisible = true;
    },

    async close() {
      this.isVisible = false;
      await this.$nextTick()
      this.isOverlayVisible = false;
      this.eventName = '';
      this.eventDate = '';
      this.eventBackgroundImage = '';
    },

    onClickAdd() {
      if (!this.validateInput()) return;

      const date = new Date(this.eventDate);
      const eventId = this.generateEventId();

      this.$emit('add', {
        eventId,
        eventName: this.eventName,
        eventDate: date,
        background: this.eventBackgroundImage,
      });

      this.close();
    },

    generateEventId() {
       return Math.floor(Math.random() * Date.now());
    },

    validateInput() {
      if (this.eventName === '') return false;
      if (this.eventDate === '') return false;

      if (this.eventBackgroundImage !== '' && (!this.eventBackgroundImage.endsWith('.png') ||
        !this.eventBackgroundImage.endsWith('.jpg') ||
        !this.eventBackgroundImage.endsWith('.jpeg') ||
        !this.eventBackgroundImage.endsWith('.gif'))) return false;

      if (this.eventBackgroundImage === '') {
        this.eventBackgroundImage = 'https://picsum.photos/1200/800';
      }

      return true;
    },

    onClickCancel() {
      this.close();
    },
  },
};
</script>
<style lang="scss">
  .c-add-event__overlay {
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

  .c-add-event {
    display: flex;
    flex-direction: column;
    width: 400px;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
  }

  .c-add-event__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(228, 228, 228);
    height: 20px;
    font-weight: 600;
    font-size: 22px;
  }

  .c-add-event__header-close {
    padding: 4px;
    cursor: pointer;

    .c-add-event__header-close-icon {
      fill: #474747;
      width: 20px;
      height: 20px;
    }

    &:hover {
      .c-add-event__header-close-icon {
        fill: rgba(#474747, 0.8);
      }
    }
  }

  .c-add-event__body {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    flex: 1;
    font-size: 13px;
  }

  .c-add-event__row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .c-add-event__label {
    min-width: 100px;
    user-select: none;
  }

  .c-add-event__input-extra {
    display: flex;
    flex-direction: column;
    flex: 1;

    .c-add-event__input {
      flex: none;
    }
  }

  .c-add-event__input-label {
    margin-top: 4px;
    font-size: 10px;
  }

  .c-add-event__input,
  .vdatetime-input {
    flex: 1;
    padding: 3px 5px;
    border-radius: 4px;
    border: 1px solid #d4d4d4;
    height: 18px;
    outline: 0;
  }

  .vdatetime-popup {
    user-select: none;
  }

  .c-add-event__image-preview {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .c-add-event__image {
    max-height: 120px;
  }

  .vdatetime {
    flex: 1;
    display: flex;

    .vdatetime-input {
      flex: 1;
      padding: 3px;
    }
  }

  .c-add-event__footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    border-top: 1px solid rgb(228, 228, 228);
  }

  .c-add-event__button {
    cursor: pointer;
    outline: 0;
    background: #fff;
    font-size: 13px;
    padding: 5px 20px;

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
