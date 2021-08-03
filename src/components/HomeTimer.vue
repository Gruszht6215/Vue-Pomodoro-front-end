<template>
  <div>
    <div id="timer">
      <h1>{{ showHour }} : {{ showMinute }} : {{ showSecond }}</h1>
      <div>
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
              Hour (0 - 23):
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
              Minute (0 - 59):
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
              Second (0 - 59):
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
        <button @click="submitEdit" v-if="isEdit === true">Confirm</button>
        <button @click="closeEditForm" v-if="isEdit === true">Cancel</button>
      </div>

      <!-- <button @click="submit">click</button> -->
    </div>
  </div>
</template>

<script>
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
    };
  },

  methods: {
    startTimer() {
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
        this.closeEditForm();
      }
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
}
#timerEditForm {
  width: 100px;
}
#inputEditForm {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
}
</style>