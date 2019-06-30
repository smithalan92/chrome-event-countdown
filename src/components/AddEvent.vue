<template>
  <div
    class="c-add-event__overlay"
    v-if="isVisible">
    <div class="c-add-event">
      <div class="c-add-event__header">
        <div class="c-add-event__header-title">
          Add New Event
        </div>
        <div class="c-add-event__header-close">
          X
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
          <input
            class="c-add-event__input"
            type="url"
            v-model="eventBackgroundImage"/>
        </div>
        <div
          class="c-add-event__image-preview"
          v-if="eventBackgroundImage">
          <img
            class="c-add-event__image"
            :src="eventBackgroundImage"/>
        </div>
      </div>
      <div class="c-add-event__footer">
        <div
          class="c-add-event__button"
          @click="onClickAdd">
          Add
        </div>
        <div
          class="c-add-event__button c-add-event__button--cancel"
          @click="onClickCancel">
          Cancel
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'AddEvent',

  components: {
    Datetime,
  },

  data() {
    return {
      isVisible: false,
      eventName: '',
      eventDate: '',
      eventBackgroundImage: '',
    };
  },

  methods: {
    open() {
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
      this.eventName = '';
      this.eventDate = '';
      this.eventBackgroundImage = '';
    },

    onClickAdd() {
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
    height: 350px;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
  }

  .c-add-event__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(228, 228, 228);
    height: 20px;
    font-weight: 600;
    font-size: 22px;
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
  }

  .c-add-event__input {
    flex: 1;
    padding: 3px;
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
    margin-right: 30px;
    outline: 0;
    background: #fff;
    font-size: 13px;
    border-radius: 4px;

    &:hover {
      text-decoration: underline;
    }

    &--cancel {
      color: red;
      margin-right: 0;
    }
  }
</style>


