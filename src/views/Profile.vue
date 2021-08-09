<template>
  <div class="profile">
    <h1>History Point Recive and Spend</h1>
    <profile-reward-history-table></profile-reward-history-table>
  </div>
</template>

<script>
import ProfileRewardHistoryTable from "@/components/ProfileRewardHistoryTable.vue";
import AuthUser from "@/store/AuthUser";

export default {
  components: {
    ProfileRewardHistoryTable,
  },
  mounted() {
    if (!this.isAuthen()) {
      swal("Restricted Area", "Please, login first", "warning");
      this.$router.push("/login");
    }
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
  },
};
</script>

<style>
</style>