<template>
  <div class="c-event-list">
    <dragable v-model="events" group="events" @start="drag=true" @end="drag=false" class="c-event-list__dragable">
        <event
          v-for="event in events"
          :key="event.name"
          :event-id="event.eventId"
          :event-name="event.eventName"
          :event-date="event.eventDate"
          :event-country="event.eventCountry"
          :event-city="event.eventCity"
          :background="event.background"/>
    </dragable>
  </div>
</template>
<script src="./EventList.js"></script>
<style src="./EventList.scss" lang="scss"></style>
