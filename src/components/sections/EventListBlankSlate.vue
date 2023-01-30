<template>
  <div class="flex items-center justify-center flex-1">
    <div
      class="absolute top-0 left-0 w-screen h-screen bg-cover bg-center bg-fixed bg-no-repeat z-[-1] opacity-70"
      :style="{ 'background-image': `url(${bgImage})` }"
    />
    <div class="text-white flex-1 text-center p-9 bg-black/40">
      No upcoming events
    </div>
  </div>
</template>
<script>
import bgImage from "../../assets/blank_slate_bg.jpg";

export default {
  name: "EventListBlankSlate",

  setup() {
    return {
      bgImage,
    };
  },
};
</script>
