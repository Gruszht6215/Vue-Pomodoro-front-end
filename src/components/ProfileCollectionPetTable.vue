<template>
  <div>
      <table>
          <thead>
              <tr class="table">
                  <th>#</th>
                  <th>Name</th>
                  <th>Rarity</th>
                  <th>Point</th>
                  <th>image</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
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
            ---
            <!-- <td v-if="index !== editIndex">{{ pet.pet_image }}</td> -->
            <!-- <td v-if="index === editIndex">
                <img src=pet.image alt=""> -->
            <!-- </td> -->
            <td>
                <button type="text">DELETE</button>
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
        openForm(index,pet){
            this.editIndex = index
            let cloned = JSON.parse(JSON.stringify(pet))
            this.form.pet_name = cloned.pet_name
            this.form.pet_rarity = cloned.pet_rarity
        },
        closeForm(){
            this.editIndex = -1
            this.form = {
                id: "",
                pet_name:"",
                pet_rarity:"",
                pet_point:"",
                pet_image:""

            }
        },
        async editPet(){
            let payload = {
                index: this.editIndex,
                id: this.form.id,
                pet_name: this.form.pet_name,
                pet_rarity: this.form.pet_rarity,
                pet_point: this.form.pet_point,
                pet_image: this.form.pet_image
            }
            console.log(payload)
            await PetApiStore.dispatch("editPet",payload)
            this.closeForm()
            this.fetchPet()
        }
    }
}
</script>

<style>

</style>