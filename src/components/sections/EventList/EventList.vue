<template>
  <div class="c-event-list">
    <dragable
      v-model="events"
      item-key="id"
      group="events"
      class="c-event-list__dragable"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <event
          :event-id="element.eventId"
          :event-name="element.eventName"
          :event-date="element.eventDate"
          :event-country="element.eventCountry"
          :event-city="element.eventCity"
          :background="element.background"
        />
      </template>
    </dragable>
  </div>
</template>
<script src="./EventList.js"></script>
<style src="./EventList.scss" lang="scss"></style>
