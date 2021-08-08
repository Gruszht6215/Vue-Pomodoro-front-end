<template>
  <div class="body">
    <div id="timer">
      <div id="point">
        <div id="box">
          Your Current Point : {{ profilePoint }} points
        </div>
        <h1>
          {{ showPointReward }} <br />
          <p>Waiting For You!</p>
          <!-- {{ isAuthen() }} <br /> -->
        </h1>
      </div>
      <div id="showTimer">
        <h1>{{ showHour }} : {{ showMinute }} : {{ showSecond }}</h1>
      </div>
      <div>
        <br>
        <button
          @click="startTimer"
          v-if="isRunning === false && isEdit === false"
        >
          Start
        </button>
        <button @click="stopTimer" v-if="isRunning === true">Give Up</button>

        <form @submit.prevent="submitEdit" v-if="isEdit === true">
          <label for="timerEditForm">Set Timer</label>
          <div id="inputEditForm">
            <label>
              Hour (0 - 23) :
              <input
                type="number"
                id="timerEditForm"
                placeholder="0-23 hours"
                min="0"
                max="23"
                v-model="defaultTimer.dafaultHour"
              />
            </label>
            <label>
              Minute (0 - 59) :
              <input
                type="number"
                id="timerEditForm"
                placeholder="0-59 minutes"
                min="0"
                max="59"
                v-model="defaultTimer.dafaultMinute"
              />
            </label>
            <label>
              Second (0 - 59) :
              <input
                type="number"
                id="timerEditForm"
                v-model="defaultTimer.dafaultSecond"
                placeholder="0-59 seconds"
                min="0"
                max="59"
              />
            </label>
          </div>
        </form>
        <button
          @click="openEditForm"
          v-if="isRunning === !true && isEdit === false"
        >
          Edit Timer
        </button>
        <!-- <button @click="test">test</button> -->
        <button @click="submitEdit" v-if="isEdit === true">Confirm</button>
        <button @click="closeEditForm" v-if="isEdit === true">Cancel</button>
      </div>

      <!-- <button @click="submit">click</button> -->
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
import AuthUser from "@/store/AuthUser";
import ProfileApi from "@/store/ProfileApi";

export default {
  data() {
    return {
      hour: 1,
      minute: 30,
      second: 0,
      totalTime: 0,
      defaultTimer: {
        dafaultHour: "",
        dafaultMinute: "",
        dafaultSecond: "",
      },
      isRunning: false,
      isEdit: false,
      pointReward: 90,
      profilePoint: 0,
    };
  },
  created() {
    this.fetchProfile();
  },
  mounted() {
    if (!this.isAuthen()) {
      swal("Restricted Area", "Please, login first", "warning");
    }
  },
  mounted(){
    if(!this.isAuthen()){
      swal("Restricted Area", "Please, login first", "wwarning");
      this.$router.push("/login");
    }
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    async fetchProfile() {
      await ProfileApi.dispatch("fetchItem", AuthUser.getters.user.id);

      this.profilePoint = ProfileApi.getters.profile(
        AuthUser.getters.user.username
      ).profile_point;
    },
    // test() {
    //   // AuthService.getAuthData();
    //   console.log(AuthUser.getters.user.username);
    //   console.log(AuthUser.getters.user);
    // },
    startTimer() {
      this.pointCal(this.hour, this.minute, this.second);
      this.isRunning = true;
      this.$root.$emit("isTimerRunning", this.isRunning);
      this.totalTime = this.second + this.minute * 60 + this.hour * 60 * 60;
      this.defaultTimer.dafaultHour = this.hour;
      this.defaultTimer.dafaultMinute = this.minute;
      this.defaultTimer.dafaultSecond = this.second;
      this.timer = setInterval(() => this.timerCal(), 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.hour = this.defaultTimer.dafaultHour;
      this.minute = this.defaultTimer.dafaultMinute;
      this.second = this.defaultTimer.dafaultSecond;
      this.totalTime = this.second + this.minute * 60 + this.hour * 60 * 60;
      this.second = this.totalTime - (this.minute * 60 + this.hour * 60 * 60);
      this.minute = Math.floor((this.totalTime - this.hour * 60 * 60) / 60);
      this.hour = Math.floor(this.totalTime / (60 * 60));
      this.isRunning = false;
      this.$root.$emit("isTimerRunning", this.isRunning);
    },
    timerCal() {
      if (this.hour === 0 && this.minute === 0 && this.second === 0) {
        this.reachGoal();
        swal(
          "Goal!!!",
          "You've got " +
            this.pointReward +
            (this.pointReward > 1 ? " Points." : " Point."),
          "success"
        );
        //reset timer to default
        this.hour = 1;
        this.minute = 30;
        this.second = 0;
      } else {
        this.totalTime--;
        if (this.second === -1) {
          this.second = 59;
        }
        if (this.minute === -1) {
          this.minute = 59;
        }
        this.second = this.totalTime - (this.minute * 60 + this.hour * 60 * 60);
        this.minute = Math.floor((this.totalTime - this.hour * 60 * 60) / 60);
        this.hour = Math.floor(this.totalTime / (60 * 60));
      }
    },
    async reachGoal() {
      clearInterval(this.timer);
      let currentProfileAccountId = ProfileApi.getters.profile(
        AuthUser.getters.user.username
      ).id;
      await AuthService.receivePoint(currentProfileAccountId, this.pointReward);
      this.fetchProfile();

      this.isRunning = false;
      this.$root.$emit("isTimerRunning", this.isRunning);
    },
    pointCal(h, m, s) {
      // this.pointReward = 11;
      this.pointReward =
        Math.floor(s * 0.1) + Math.floor(m * 0.8) + Math.floor(h * 66);
    },
    adaptTime(time) {
      if (time === -1) {
        time = 59;
      }
      return (time < 10 ? "0" : "") + time;
    },
    openEditForm() {
      this.isEdit = true;
    },
    closeEditForm() {
      this.isEdit = false;
    },
    submitEdit() {
      if (
        this.defaultTimer.dafaultHour > 23 ||
        this.defaultTimer.dafaultMinute > 59 ||
        this.defaultTimer.dafaultSecond > 59 ||
        this.defaultTimer.dafaultHour < 0 ||
        this.defaultTimer.dafaultMinute < 0 ||
        this.defaultTimer.dafaultSecond < 0 ||
        this.defaultTimer.dafaultHour === "" ||
        this.defaultTimer.dafaultMinute === "" ||
        this.defaultTimer.dafaultSecond === ""
      ) {
        swal(
          "Warning",
          "hour must contain number between 0-23\n minute&second must contain number between 0-59",
          "warning"
        );
      } else {
        this.hour = parseInt(this.defaultTimer.dafaultHour);
        this.minute = parseInt(this.defaultTimer.dafaultMinute);
        this.second = parseInt(this.defaultTimer.dafaultSecond);
        this.pointCal(this.hour, this.minute, this.second);
        this.closeEditForm();
      }
    },
  },
  computed: {
    showPointReward() {
      return (
        this.pointReward + " " + (this.pointReward > 1 ? "Points" : "Point")
      );
    },
    showSecond() {
      return this.adaptTime(this.second);
    },
    showMinute() {
      return this.adaptTime(this.minute);
    },
    showHour() {
      return this.adaptTime(this.hour);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only scoped lang="scss"-->
<style scoped lang="scss">
.body {
  display: flex;
  height: 100%;
  overflow: hidden;
  align-content: center;
  background-attachment: fixed;
  background: #e5e1e0;
}
#timer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
  width: 100%;
  height: 775px;
}
#timerEditForm {
  border: none;
  border-radius: 10px;
  margin: 5px;
  width: 120px;
}
#inputEditForm {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
}
#showTimer {
  position: relative;
  background-color: #ffdf6f;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 210px;
  height: 210px;
  
}
#point {
  // margin-bottom: 100px;
  position: relative;
  padding: 20px;
}
h1 {
  font-size: 27px;
}
#box {
  color: #ffffff;
  margin: 20px;
  border-radius: 25px;
  background: #fbc1ad;
  padding: 20px;
  width: fit-content;
  height: fit-content;
}
button,
.open-button {
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background: #fbc1ad;
  cursor: pointer;
}

.open-button {
  color: white;
  border: none;
  opacity: 0.8;
  position: fixed;
}
</style>