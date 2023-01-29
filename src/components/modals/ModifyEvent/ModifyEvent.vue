<template>
  <div v-if="isOverlayVisible" class="c-add-event__overlay">
    <transition name="slideDown">
      <div
        v-if="isVisible"
        v-click-outside="close"
        class="c-add-event"
        style="animation-duration: 0.5s"
      >
        <div class="c-add-event__header">
          <div class="c-add-event__header-title">
            {{ mode === "edit" ? `Edit ${eventName}` : "Add New Event" }}
          </div>
          <div class="c-add-event__header-close" @click="close">
            <close-icon class="c-add-event__header-close-icon" />
          </div>
        </div>
        <div class="c-add-event__body">
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Country</span>
            <v-select
              v-model="selectedCountry"
              :options="countries"
              placeholder="Type to search countries"
              label="name"
            ></v-select>
          </div>
          <div v-if="selectedCountry" class="c-add-event__row">
            <span class="c-add-event__label">Event City</span>
            <v-select
              v-model="selectedCity"
              :options="cities"
              placeholder="Type to search cities"
              label="name"
              @search="loadCities"
            ></v-select>
          </div>
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Name</span>
            <input
              ref="name"
              v-model="eventName"
              class="c-add-event__input"
              type="text"
            />
          </div>
          <div class="c-add-event__row">
            <span class="c-add-event__label">Event Date</span>
            <Datepicker v-model="eventDate" />
          </div>
          <div class="c-add-event__row">
            <span class="c-add-event__label">Image</span>
            <div class="c-add-event__input-extra">
              <input
                v-model="eventBackgroundImage"
                class="c-add-event__input"
                type="url"
              />
              <span class="c-add-event__input-label">
                Paste a URL to an image here. If empty, a random image will be
                used.
              </span>
            </div>
          </div>
          <transition name="zoom">
            <div v-if="eventBackgroundImage" class="c-add-event__image-preview">
              <img class="c-add-event__image" :src="eventBackgroundImage" />
            </div>
          </transition>
        </div>
        <div class="c-add-event__footer">
          <button
            class="c-add-event__button c-add-event__button--cancel"
            @click="onClickCancel"
          >
            Cancel
          </button>
          <button
            class="c-add-event__button c-add-event__button--add"
            :disabled="isSaveButtonDisabled"
            @click="onClickConfirm"
          >
            {{ mode === "edit" ? `Update` : "Add" }}
          </button>
        </div>
      </div>
    </transition>
    <global-events @keydown.esc="close" />
  </div>
</template>
<script src="./ModifyEvent.js"></script>
<style src="./ModifyEvent.scss" lang="scss"></style>
