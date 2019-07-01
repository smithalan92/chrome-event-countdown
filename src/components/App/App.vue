<template>
  <div class="c-app">
    <event-list
      :events="events"
      @remove-event="onRemoveEvent"/>
    <div
      class="c-app__add-event-button"
      @click="openAddEvent">Add Event</div>
    <add-event
      ref="addEvent"
      @add="onAddEvent"/>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
