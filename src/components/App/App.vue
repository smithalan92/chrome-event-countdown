<template>
  <div class="c-app">
    <event-list/>
    <div
      class="c-app__add-event-button"
      @click="openAddEvent">Add Event</div>
    <add-event ref="addEvent"/>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
