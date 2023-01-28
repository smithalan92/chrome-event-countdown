<template>
  <div class="c-app">
    <event-list v-if="hasEvents"/>
    <blank-slate v-else/>
    <StickyNotes />
    <AddPopover />
    <modify-event/>
    <add-sticky-note />
  </div>
</template>
<script src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
