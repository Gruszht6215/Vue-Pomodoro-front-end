<template>
  <div class="distance">
    <h1>Reward</h1>
    <pet-info></pet-info>
  </div>
</template>

<script>
import PetInfo from "@/components/reward/PetInfo";
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      username: "",
      point: "",
    };
  },
  mounted() {
    if (!this.isAuthen()) {
      swal("Restricted Area", "Please, login first", "warning");
      this.$router.push("/login");
    }
  },
  components: {
    PetInfo,
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    logout() {
      console.log(AuthUser.getters.user);
    },
  },
};
</script>
<style lang="scss" scoped>
.distance {
    margin-top: 85px;
    text-align: center;
    align-content: center;
}
h1 {
  margin: 20px;
}
div {
  align-content: center;
}
</style>