<template>
  <div class="distance">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <img src="@/assets/email.png" alt="email">
        <input v-model="form.email" type="text" placeholder=" email" />
      </div>
      <div>
        <img src="@/assets/key.png" alt="password">
        <input v-model="form.password" type="password" placeholder=" password" />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  </div>
</template>

<script>
// import AuthService from "@/services/AuthService";
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      //   let res = await AuthService.login(this.form);
      let res = await AuthUser.dispatch("login", this.form);
      if (res.success) {
        this.$router.push("/");
      } else {
        swal("Login Failed", res.message, "error");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.body {
  margin-bottom: 20px;
}
input {
  background-color: #e5e1e0;
  border: none;
  border-radius: 10px;
  margin: 5px;
  padding-bottom: 5px;
  width: 150px;
}
button {
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background: #fbc1ad;
  cursor: pointer;
}
img {
  width: 30px;
  height: 30px;
}
</style>