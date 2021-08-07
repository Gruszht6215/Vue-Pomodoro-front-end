<template>
  <div class="profile">
      <h1 style="center">Profile page</h1>
    <div class="info">
    </div>
    <profile-collection-pet-table></profile-collection-pet-table>
  
    <h2>Reward History</h2>
    <profile-reward-history-table></profile-reward-history-table>
  </div>
</template>

<script>
import ProfileCollectionPetTable from '../components/ProfileCollectionPetTable.vue'
import ProfileRewardHistoryTable from '../components/ProfileRewardHistoryTable.vue'
export default {
  components: { 
    ProfileCollectionPetTable, 
    ProfileRewardHistoryTable
  },
}
</script>

<style>

</style>