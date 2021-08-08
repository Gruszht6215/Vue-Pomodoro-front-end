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
            <td v-if="index === editIndex">
                <img :src="getImage(pet.pet_image.url)" alt="">
            </td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import PetApiStore from "@/store/petApi.js"
export default {
    data(){
        return{
            pets: [],

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
        this.fetchPet()
    },
    methods:{
        async fetchPet(){
            await PetApiStore.dispatch("fetchPet")
            this.pets = PetApiStore.getters.pets
        },
        getImage(url){
            return "http://localhost:1337"+url
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