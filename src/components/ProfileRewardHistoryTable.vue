<template>
  <div class="distance-for-profile">
    <br>
      <h1>History </h1>
      <br>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Email</th>
          <th>Type</th>
          <th>Point Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leaderboard in leaderboards" :key="leaderboard.id">
          <td v-if="isAuthUser(leaderboard.user_email)">
            {{ leaderboard.user_email }}
          </td>
          <td v-if="isAuthUser(leaderboard.user_email)">
            {{ leaderboard.point_type }}
          </td>
          <td v-if="isAuthUser(leaderboard.user_email)">
            {{ leaderboard.point_amount }}
          </td>
          <td v-if="isAuthUser(leaderboard.user_email)">
            {{ leaderboard.active_date }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button @click="isAuthUser()"></button> -->
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";
import LeaderboardApi from "@/store/LeaderBoardApi";

export default {
  data() {
    return {
      leaderboards: [],
    };
  },
  created() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      await LeaderboardApi.dispatch("fetchItem");
      this.leaderboards = LeaderboardApi.getters.leaders;
    },
    isAuthUser(email) {
      if (AuthUser.getters.user.email === email) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>