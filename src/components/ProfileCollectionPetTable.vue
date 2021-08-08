<template>
  <div>
      <h2>Pet Collection</h2>
      <table class="table table-striped">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Rarity</th>
                  <th>Point</th>
                  <th>Image</th>
              </tr>
          </thead>
          <tbody >
            <tr v-for="(pet, index) in pets" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-if="index !== editIndex">{{ pet.pet_name }}</td>
            <td v-if="index === editIndex">
                <input type="text" v-model="form.pet_name" />
            </td>

            <td v-if="index !== editIndex">{{ pet.pet_rarity }}</td>
            <td v-if="index === editIndex">
                <input type="text" v-model="form.pet_rarity" />
            </td>
            <td v-if="index !== editIndex">{{ pet.pet_point }}</td>
            <td v-if="index === editIndex">
                <input type="text" v-model="form.pet_point" />
            </td>
            <td v-if="index !== editIndex"><img :src="getImage(pet.pet_image.url)" width="50"></td>
            <!-- <td v-if="index === editIndex">
                <img src="getImage(pet.pet_image.url)" alt="">
            </td> -->
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import PetApiStore from "@/store/petApi.js"
import AuthUser from "@/store/AuthUser"
import ProfileApi from "@/store/ProfileApi"
export default {
    data(){
        return{
            pets: [],
            profiles:[],
            editIndex: -1,
            form:{
                id: "",
                pet_name:"",
                pet_rarity:"",
                pet_point:"",
                pet_image:""
            },
        }
    },
    created(){
        // this.fetchProfile()
    },
    mounted(){
    if(!this.isAuthen()){
      swal("Restricted Area", "Please, login first", "wwarning");
      this.$router.push("/login");
    }
  },
    methods:{
        async fetchProfile(){
            await PetApiStore.dispatch("fetchItem",AuthUser.getters.user.id)
            this.profiles = ProfileApi.getters.profiles
            
            console.log(this.profiles)
        },
        getImage(url){
            return "http://localhost:3000"+url
        },
        isAuthen() {
            console.log(AuthUser.getters.isAuthen)
            return AuthUser.getters.isAuthen
    }
  }
}
</script>

<style>
img{
    position: relative;
    border-radius: 50%;
}
</style>