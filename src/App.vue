<template>
  <div id="app">
    <div id="nav">
      <div v-if="this.isTimerRunning === false">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div v-if="this.isTimerRunning === true">You Are On Focus Mode</div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTimerRunning: false,
    };
  },
  mounted() {
    this.$root.$on("isTimerRunning", (timerStatus) => {
      this.isTimerRunning = timerStatus;
    });
  },
  methods: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: pink;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
