<template>
  <div id="app">
    <div id="nav">
      <div v-if="this.isTimerRunning === false">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/reward">Reward</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/createPet">Create Pet</router-link></li>
        <div v-if="!isAuthen()">
          <li style="float: right" class="active">
            <router-link to="/login">Login</router-link>
          </li>
          <li style="float: right" class="active">
            <router-link to="/register">Register</router-link>
          </li>
        </div>
        <div v-if="isAuthen()">
          <li style="float: right" class="active">
            <router-link to="/logout">Logout</router-link>
          </li>
          <div v-if="isAdmin()">
            <li style="float: right" class="active">
              <router-link to="/leaderboard">Leaderboard</router-link>
            </li>
          </div>
        </div>
      </div>
      <div class="focus" v-if="this.isTimerRunning === true">
        You Are On Focus Mode
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
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
  methods: {
    isAdmin() {
      if (AuthUser.getters.user.role.name === "Admin") {
        return true;
      }
      return false;
    },
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: #ffffff;
}
#nav {
  top: 0;
  width: 100%;
  position: fixed;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #7dabd0;
}
li {
  float: left;
}
li a {
  display: block;
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover:not(.active) {
  background-color: #cfe7ea;
}
.active {
  background-color: #ffdf6f;
}
.focus {
  color: #ffffff;
  padding: 14px;
  width: 100%;
  height: fit-content;
}
.route {
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px;
  }
}
.menuButton {
  width: 280px;
}
.login {
  margin-top: 360px;
  display: block;
}
.logout {
  display: block;
  margin-top: 10px;
}
</style>