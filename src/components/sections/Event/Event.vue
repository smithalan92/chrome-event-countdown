<template>
  <div class="c-event">
    <div
      class="c-event__background"
      :style="{ 'background-image': 'url(' + background + ')' }"/>
    <div class="c-event__info">
      <div
        class="c-event-info-delete"
        @click="onClickRemove">
        <trash-icon class="c-event__info-delete-icon"/>
      </div>
      <span class="c-event__title" v-if="isReady">{{ eventName }}</span>
      <countdown
        :time="countdownDate"
        :emit-events="true"
        @progress="calculateCountdownProgress">
        <div class="c-event__countdown">
          <div class="c-event__countdown-weeks">{{ weekString }}</div>
          <div class="c-event__countdown-other">
            <div class="c-event__countdown-other-row">
              <span class="c-event__countdown-time" v-if="dayString">{{ dayString }}</span>
              <span class="c-event__countdown-time">{{ hourString }}</span>
            </div>
            <div class="c-event__countdown-other-row">
              <span class="c-event__countdown-time">{{ minuteString }}</span>
              <span class="c-event__countdown-time">{{ secondString }}</span>
            </div>
          </div>
        </div>
      </countdown>
    </div>
  </div>
</template>
<script src="./Event.js"></script>
<style src="./Event.scss" lang="scss"></style>
