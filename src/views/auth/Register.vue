<template>
  <div class="distance">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username : </label>
        <input v-model="form.username" type="text" placeholder=" username" />
      </div>

      <div>
        <label for="email">Email :</label>
        <input v-model="form.email" type="text" placeholder=" email" />
      </div>

      <div>
        <label for="password">Password :</label>
        <input v-model="form.password" type="password" placeholder=" password" />
      </div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      let res = await AuthUser.dispatch("register", this.form);
      if (res.success) {
        swal("Register Success", `Welcome ${res.user.username}`, "success");
        this.$router.push("/");
      } else {
        swal("Register Failed", res.message, "error");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  background-color: #e5e1e0;
  border: none;
  border-radius: 10px;
  margin: 5px;
  width: 150px;
}
button {
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background: #fbc1ad;
  cursor: pointer;
}
</style>