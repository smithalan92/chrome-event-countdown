<template>
  <div class="c-event-list">
    <event
      v-for="event in events"
      :key="event.name"
      :event-id="event.eventId"
      :event-name="event.eventName"
      :event-date="event.eventDate"
      :background="event.background"
      @remove-event="onRemoveEvent"/>
  </div>
</template>
<script src="./EventList.js"></script>
<style src="./EventList.scss" lang="scss"></style>
