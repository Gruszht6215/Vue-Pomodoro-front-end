<template>
  <div>
    <div id="timer">
      <h1>{{ showHour }} : {{ showMinute }} : {{ showSecond }}</h1>
      <button @click="startTimer">Start</button>
      <button @click="stopTimer">Stop</button>
      <!-- <button @click="submit">click</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hour: 1,
      minute: 1,
      second: 5,
      totalTime: 0,
      isRunning: false,
    };
  },

  methods: {
    startTimer() {
      this.isRunning = true;
      this.$root.$emit("isTimerRunning", this.isRunning);
      console.log(this.isRunning);
      this.totalTime = this.second + this.minute * 60 + this.hour * 60 * 60;
      this.timer = setInterval(() => this.timerCal(), 1000);
    },
    stopTimer() {
      this.isRunning = false;
      this.$root.$emit("isTimerRunning", this.isRunning);
      clearInterval(this.timer);
    },
    timerCal() {
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
    },
    adaptTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
  },
  computed: {
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
#timer {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto;
  width: 600px;
  height: 700px;
  left: 50%;
  top: 50%;
  h1 {
  }
}
// #timer {
//   background: navajowhite;
//   position: center;
//   left: 50%;
//   top: 50%;
//   // width: 200px;
//   // height: 200px;
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
// }
</style>