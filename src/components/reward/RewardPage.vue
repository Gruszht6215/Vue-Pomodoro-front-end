<template>
  <div class="">
    <h1><i>Reward </i>🌷</h1>
    <div class="fixed-boxUser">
      <p>
        Username : ... <br>
        My Point : ... points
      </p>
    </div>
    <pet-info></pet-info>
    <button class="fixed-btn" @click="logout()">Logout</button>
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
  components: {
    PetInfo,
  },
  methods: {
    
    logout() {
      console.log(AuthUser.getters.user);
    },
  },
};
</script>
<style lang="scss" scoped>
.bodyPage {

}
.fixed-btn {
  position: fixed;
  bottom: 4%;
  right: 2%;
  background: #fbc1ad;
  width: 130px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 4px 4px 4px #ee34de;
  cursor: pointer;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 900;
  color: #fff;
}
.fixed-btn:active {
  box-shadow: 0 0;
}
.fixed-boxUser {
  position: fixed;
  top: 12%;
  right: 2%;
  border-radius: 25px;
  background: #f39aff;
  box-shadow: 4px 4px 4px #ee34de;
  padding: 10px 30px;
  width: fit-content;
  height: 70px;
  color: rgb(255, 255, 255);
}
p {
  text-align: left;
}
h1 {
  margin: 20px;
}
div {
  align-content: center;
}
</style>