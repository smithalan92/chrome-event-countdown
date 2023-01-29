<template>
  <div class="c-event">
    <div
      class="c-event__background"
      :style="{ 'background-image': 'url(' + background + ')' }"
    />
    <div class="c-event__info">
      <div v-if="isReady" class="c-event__actions">
        <div class="c-event-info-action" @click="onClickEdit">
          <edit-icon class="c-event__info-icon" />
        </div>
        <div class="c-event-info-action" @click="onClickRemove">
          <trash-icon class="c-event__info-icon" />
        </div>
      </div>
      <span v-if="isReady" class="c-event__title">{{ eventName }}</span>
      <city-data :event-city="eventCity" :event-country="eventCountry" />
      <countdown
        v-if="!hasEventPassed"
        :time="countdownDate"
        :emit-events="true"
        @progress="calculateCountdownProgress"
      >
        <div class="c-event__countdown">
          <div class="c-event__countdown-weeks">{{ weekString }}</div>
          <div class="c-event__countdown-other">
            <span class="c-event__countdown-time">{{ dayString }}</span>
            <span class="c-event__countdown-time">{{ hourString }}</span>
            <span class="c-event__countdown-time">{{ minuteString }}</span>
            <span class="c-event__countdown-time">{{ secondString }}</span>
          </div>
        </div>
      </countdown>
      <div v-else class="c-event__finished">
        {{ formatedEventDate }}
        <check-icon class="c-event__finished-icon" />
      </div>
    </div>
  </div>
</template>
<script src="./Event.js"></script>
<style src="./Event.scss" lang="scss"></style>
