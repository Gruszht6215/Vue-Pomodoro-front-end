<template>
  <div class="home">
    <home-timer></home-timer>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTimer from "@/components/HomeTimer";

export default {
  name: "Home",
  components: {
    HomeTimer,
  },
};
</script>
