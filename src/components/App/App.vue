<template>
  <div class="c-app">
    <event-list/>
    <div
      class="c-app__add-event"
      @click="openAddEvent">
      <plus-icon class="c-app__add-event-icon"/>
    </div>
    <add-event ref="addEvent"/>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
