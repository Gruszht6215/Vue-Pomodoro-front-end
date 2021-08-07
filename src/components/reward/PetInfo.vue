<template>
  <div class="row">
    <div>
      <button class="open-button" @click="openFormToAdd()">Add new pet</button>
      <div class="form-popup" tagname="myForm">
        <div>
          <label for="pet_name">Name :</label>
          <input type="text" v-model="form.pet_name">
        </div>
        <div>
          <label for="pet_rarity">Rarity :</label>
          <input type="text" v-model="form.pet_rarity">
        </div>
        <div>
          <label for="pet_point">Point :</label>
          <input type="text" v-model="form.pet_point">
        </div>
        <!-- <div>
          <input type="image" src="@/assets/photo.png" v-model="form.pet_image">
        </div> -->
      </div>
    </div>
    <br>
       <div class="column" id="box" v-for="(pet,index) in pets" v-bind:key="index">
         <img :src="getImage(pet.pet_image.url)">
         <h2><i>{{pet.pet_name}}</i></h2>
         <p>Rarity : {{pet.pet_rarity}}<br>
         Point : {{pet.pet_point}} points</p>
         <button @click="decreaseUserpoint(pet.id, 100)">Purchase</button> <!--สมมติ points-->
      </div>
  </div>
</template>

<script>
import PetApi from "@/store/petApi"
import AuthUser from '@/store/AuthUser'

export default {
  data() {
    return {
      pets: [],
      editIndex: -1,
      form: {
        id: '',
        pet_name: '',
        pet_rarity: '',
        pet_point: '',
        pet_image: ''
      }
    };
  },

  created() {
    //ใช้ this เรียก methods ใน components ตัวเอง
    this.fetchItem();
  },

  methods: {
    async fetchItem() {
      await PetApi.dispatch("fetchItem");
      this.pets = PetApi.getters.pets;
    },
    openForm(index, pet) {
      //for admin
      this.editIndex = index
      let cloned = JSON.parse(JSON.stringify(pet))
      this.form.pet_name = cloned.pet_name
      this.form.pet_rarity = cloned.pet_rarity
      this.form.pet_point = cloned.pet_point
    },
    closeForm() {
      //for admin
      this.editIndex = -1
      this.form = {
        id: '',
        pet_name: '',
        pet_rarity: '',
        pet_point: '',
        pet_image: ''
      }
    },
    openFormToAdd() {
      document.getElementsByTagName("myForm").style.display = 'block'
    },
    closeFormToAdd() {
      document.getElementsByTagName("myForm").style.display = 'none'
    },
    async editItem() {
      //for admin
      let payload = {
        index: this.editIndex,
        id: this.form.id,
        pet_name: this.form.pet_name,
        pet_rarity: this.form.pet_rarity,
        pet_point: this.form.pet_point,
        //pet_image: this.form.pet_image ยังไม่ได้ split url
      }
      await PetApi.dispatch('editItem', payload)
      this.closeForm()
      this.fetchItem()
    },
    async addItem() {
      //for admin
      let payload = {
        index: this.editIndex,
        id: this.form.id,
        pet_name: this.form.pet_name,
        pet_rarity: this.form.pet_rarity,
        pet_point: this.form.pet_point,
        //pet_image: this.form.pet_image ยังไม่ได้ split url
      }
      let res = await PetApi.dispatch("addItem", payload)
      if (res.success) {
        this.closeForm()
      } else {
        console.log('Add mai dai')
        swal('Add Failed', res.message, 'error')
      }
    },
    calculateUserPoint(pet_id, user_point) {
            this.pets.forEach(function(pet) {
              if (pet_id === pet.id) {
                user_point -= parseInt(pet.pet_point)
              }
            })
            return user_point
    },
    decreaseUserPoint(pet_id, user_point) {
      //ลด point ของ user
      swal({
        title: "Are you sure to buy this pet?",
        text: "If you click, You will receive a lovely pet!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willPurchase) => {
          if (willPurchase) {
            calculateUserPoint(pet_id, user_point)
            swal("You received a lovely PET!", {
              icon: "success",
            });
          } else {
            swal("This pet so sad to you.");
          }
        });
    },
    // addPetToUser() {
    //   //เพิ่มสัตว์เลี้ยงให้ user
    // },
    getImage(url) {
      return 'http://localhost:1337' + url
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
  width: 25%;
  padding: 10px;
}
.row:after {
  display: flex;
  clear: both;
}
#box {
    margin: 20px;
    border-radius: 25px;
    background: #f6ffea;
    padding: 20px;
    width: fit-content;
    height: fit-content;
}
h2 {
  text-transform: capitalize;
}
img {
  display: block;
  border-radius: 25px;
  width: 250px;
  height: 250px;
}
button, .open-button {
  text-align: center;
  border-radius: 10px;
  background: #ffbbf4;
  cursor: pointer;
}

.open-button {
  color: white;
  border: none;
  opacity: 0.8;
  position: fixed;
}
.form-popup {
  display: none;
  position: fixed;
  top: 10px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}
.form-container input[type=text]{
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}
.form-container input[type=text]:focus {
  background-color: #ddd;
  outline: none;
}
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}
.form-container .cancel {
  background-color: red;
}
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

</style>