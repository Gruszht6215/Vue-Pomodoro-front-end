<template>
       <!-- <div class="row">
           <div class="column" id="box">
               <p >{{}}</p>
           </div>
           <div class="column" id="box">
               <p>test2</p>
           </div>
           <div class="column" id="box">
               <p>test3</p>
           </div>
      </div> -->
      <table>
          <thead>
              <tr>
                  <th>url image</th>
                  <th>name</th>
                  <th>info</th>
                  <th>rarity</th>
                  <th>point</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(pet,index) in pets" v-bind:key="index">
                  <td>{{pet.id}}</td>
                  <td>{{pet.pet_name}}</td>
                  <td>{{index}}</td>
                  <td>{{pet.pet_rarity}}</td>
                  <td>{{pet.pet_point}}</td>
              </tr>
          </tbody>
      </table>
</template>

<script>
import PetApi from '@/store/petApi'
export default {
    data() {
        return {
            pets: [],
        }
    },
    methods: {
        fetchItem() {
            PetApi.dispatch('fetchItem')
            this.pets = PetApi.getters.pets
            console.log(this.pets)
        },
        decreasePoints(pet_point) {
            //ลบจำนวน point ของ user

        }
    }
}
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
@media screen {
  .column {
    width: 100%;
  }
}
.column {
  float: left;
  width: 33.33%;
  padding: 10px;
}
.row:after {
  content: "";
  display: flex;
  clear: both;
}
#box {
    margin: 20px;
    border-radius: 25px;
    background: #f6ffea;
    padding: 20px;
    width: 200px;
    height: 400px;
}
</style>