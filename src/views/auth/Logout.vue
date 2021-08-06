<template></template>

<script>
// import AuthService from "@/services/AuthService";
import AuthUser from "@/store/AuthUser";

export default {
  mounted() {
    AuthUser.dispatch("logout");
    this.$router.push("/login");
  },
};
</script>

<style>
</style>