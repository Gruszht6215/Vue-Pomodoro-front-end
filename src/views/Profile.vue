<template>
  <div class="profile">
    <h1>Profile page</h1>

    <profile-collection-pet-table></profile-collection-pet-table>
  </div>
</template>

<script>
import ProfileCollectionPetTable from '../components/ProfileCollectionPetTable.vue'
export default {
  components: { 
    ProfileCollectionPetTable 
  },
}
</script>

<style>

</style>