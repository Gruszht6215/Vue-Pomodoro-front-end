<template>
  <div>
      <d-table class="table table-striped">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Earned Point</th>
                  <th>Date</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(profile, index) in profiles" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-if="index !== editIndex" >
                {{ profile.profile_point }}
            </td>
            <td v-if="index === editIndex">
                <input type="text" v-model="form.profile_point" />
            </td>

            <td v-if="index !== editIndex">{{ profile.created_at.substring(0,10) }}

            </td>
            <td v-if="index === editIndex">
                <input type="text" v-model="form.created_at" />
            </td>
            <!-- <td v-if="index !== editIndex">{{ pet.pet_point }}</td>
            <td v-if="index === editIndex">
                <input type="text" v-model="form.pet_point" />
            </td>
            <td v-if="index !== editIndex"><img :src="getImage(pet.pet_image.url)" width="100" style="display:block;"></td>
            <td v-if="index === editIndex">
                <img src="getImage(pet.pet_image.url)" alt="">
            </td>
            <td>
                <button type="text">DELETE</button>
            </td> -->
            </tr>
          </tbody>
      </d-table>
  </div>
</template>

<script>
import ProfileApiStore from "@/store/profileApi.js"
export default {
    data(){
        return{
            profiles: [],

            editIndex: -1,
            form:{
                id: "",
                profile_name: "",
                profile_point: "",
                pet_collection: "",
            },
        }
    },
    created(){
        this.fetchProfile()
    },
    methods:{
        async fetchProfile(){
            await ProfileApiStore.dispatch("fetchProfile")
            this.profiles = ProfileApiStore.getters.profiles
        },
    }
}
</script>

<style>

</style>