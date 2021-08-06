<template>
  <div>
      <h1><i>Reward </i>🌷</h1>
      <pet-info></pet-info>
  </div>
</template>

<script>
import PetInfo from '@/components/reward/PetInfo'
export default {
    components: {
        PetInfo
    }
}
</script>
<style lang="scss" scoped>
button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>