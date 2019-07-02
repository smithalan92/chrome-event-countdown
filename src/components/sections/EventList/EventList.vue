<template>
  <div class="c-event-list">
    <div
      class="c-event-list__list"
      v-if="events.length">
      <event
        v-for="event in events"
        :key="event.name"
        :event-id="event.eventId"
        :event-name="event.eventName"
        :event-date="event.eventDate"
        :background="event.background"/>
    </div>
    <div
      class="c-event-list__blank-slate"
      v-else>
      No events have been added. You can add some using the button below.
    </div>
  </div>
</template>
<script src="./EventList.js"></script>
<style src="./EventList.scss" lang="scss"></style>
