<template>
  <div
    class="c-add-event__overlay"
    v-if="isOverlayVisible">
    <transition name="slideDown">
      <div
        class="c-add-event"
        style="animation-duration: 0.5s"
        v-click-outside="close"
        v-if="isVisible">
        <div class="c-add-event__header">
          <div class="c-add-event__header-title">
            {{ mode === 'edit' ? `Edit ${eventName}` : 'Add New Event' }}
          </div>
          <div
            class="c-add-event__header-close"
            @click="close">
            <close-icon class="c-add-event__header-close-icon"/>
          </div>
        </div>
        <div class="c-add-event__body">
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Name</span>
            <input
              ref="name"
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
            @click="onClickConfirm">
            {{ mode === 'edit' ? `Update` : 'Add' }}
          </div>
        </div>
      </div>
    </transition>
    <global-events
      @keydown.esc="close"/>
  </div>
</template>
<script src="./ModifyEvent.js"></script>
<style src="./ModifyEvent.scss" lang="scss"></style>
