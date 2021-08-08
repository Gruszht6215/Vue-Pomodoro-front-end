<template>
  <div id="app">
    <div id="nav">
      <div class="route">
        <b-button   style="background-color:white;color:black;display:block;" v-b-toggle.sidebar-1>Toggle Menu</b-button>
        <b-sidebar id="sidebar-1" title="PET FOCUS" shadow>
        <div class="px-3 py-2">
        <div v-if="this.isTimerRunning === false">
        <p><b-button class="menuButton" variant="outline-danger"><router-link to="/" style="text-decoration: none">HOME</router-link></b-button></p>
        <p><b-button class="menuButton" variant="outline-danger"><router-link to="/reward" style="text-decoration: none">REWARD</router-link></b-button></p>
        <p><b-button class="menuButton" variant="outline-danger"><router-link to="/profile" style="text-decoration: none">PROFILE</router-link></b-button></p>
        <p><b-button class="menuButton" variant="outline-danger"><router-link to="/leaderboard" style="text-decoration: none">LEADER BOARD</router-link></b-button></p>
        <p class="register"><b-button class="menuButton" variant="outline-danger"><router-link to="/register" style="text-decoration: none">REGISTER</router-link></b-button></p>
        <p class="login"><b-button class="menuButton" variant="outline-danger"><router-link to="/login" style="text-decoration: none">LOGIN</router-link></b-button></p>
        <p class="logout"><b-button class="menuButton" variant="outline-danger"><router-link to="/logout" style="text-decoration: none">LOGOUT</router-link></b-button></p>
      </div>
        </div>
        </b-sidebar>
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
  padding: 10px;
  background-color: pink;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: rgb(0, 0, 0);
    }
  }
}
v-b-toggle.sidebar-border{
  color: #42b983;
}
.route{
  p{
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px;   
  }
}
.menuButton{
  width: 280px;
}
.login{
  margin-top: 360px;
  display: block;
  
}
.logout{
  display: block;
  margin-top: 10px;

}

  


</style>
