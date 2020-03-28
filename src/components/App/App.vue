<template>
  <div class="c-app">
    <event-list v-if="hasEvents"/>
    <blank-slate v-else/>
    <div
      class="c-app__add-event"
      @click="openAddEvent">
      <plus-icon class="c-app__add-event-icon"/>
    </div>
    <modify-event/>
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
