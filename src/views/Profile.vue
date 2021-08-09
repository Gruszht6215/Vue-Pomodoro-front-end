<template>
  <div class="profile">
      <h1 style="center">Profile page</h1>
    <div class="info">
    </div>
    <profile-collection-pet-table></profile-collection-pet-table>
    <profile-reward-history-table></profile-reward-history-table>
  </div>
</template>

<script>
import ProfileCollectionPetTable from '../components/ProfileCollectionPetTable.vue'
import ProfileRewardHistoryTable from '../components/ProfileRewardHistoryTable.vue'
import AuthUser from "@/store/AuthUser"
export default {
  components: { 
    ProfileCollectionPetTable, 
    ProfileRewardHistoryTable
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
  }
}
</script>

<style>

</style>