<template>
  <div
    class="c-add-event__overlay"
    v-if="isOverlayVisible">
    <transition name="slideDown">
      <div
        class="c-add-event"
        style="animation-duration: 0.5s"
        v-click-outside="onClickOutside"
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
            <span class="c-add-event__label">Event Country</span>
            <v-select
              :select-options="countries"
              v-model:selected="selectedCountry"
              :allow-search="true"
              placeholder="Select a country"
              :displayLabel="(item) => item.name"></v-select>
          </div>
          <div
            class="c-add-event__row"
            v-if="selectedCountry">
            <span class="c-add-event__label">Event City</span>
            <v-select
              :select-options="cities"
              v-model:selected="selectedCity"
              :allow-search="true"
              placeholder="Select a city"
              @search="loadCities"
              :displayLabel="(item) => item.name"></v-select>
          </div>
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Name</span>
            <input
              ref="nameRef"
              class="c-add-event__input"
              type="text"
              v-model="eventName"/>
          </div>
          <div
            class="c-add-event__row">
            <span class="c-add-event__label">Event Date</span>
            <date-picker
              class="c-add-event__date"
              v-model:selected-date="eventDate"/>
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
  </div>
</template>
<script src="./ModifyEvent.js"></script>
<style src="./ModifyEvent.scss" lang="scss"></style>
