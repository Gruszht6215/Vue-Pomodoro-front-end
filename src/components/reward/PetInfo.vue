<template>
  <div class="row">
    <div>
      <button v-if="isAdmin()" class="open-button" @click="openEditForm()">Add new pet</button>
    </div>
    <div class="column" id="box" v-for="(pet, index) in pets" v-bind:key="index">
      <div v-if="index !== editIndex"> 
        <img :src="getImage(pet.pet_image.url)" />
      </div>
      <!-- <div v-if="index === editIndex"> 
        เปลี่ยนรูปภาพโดยที่รูปเดิมยังอยู่
      </div> -->

      <div v-if="index !== editIndex"> 
        <h2><i>{{ pet.pet_name }}</i></h2>
      </div>
      <div v-if="index === editIndex"> 
        <label for="pet_name">Name : </label>
        <input type="text" v-model="form.pet_name" id="input-default"/>
      </div>

      <div v-if="index !== editIndex"> 
        <p>Rarity : {{ pet.pet_rarity }}</p>
      </div>
      <div v-if="index === editIndex"> 
        <label for="pet_name">Rarity : </label>
        <select v-model="form.rarity">
          <option disabled value="">Please select one</option>
          <option>Legendary</option>
          <option>Epic</option>
          <option>Rare</option>
          <option>Common</option>
        </select>
      </div>

      <div v-if="index !== editIndex"> 
        <p>Point : {{ pet.pet_point }} points</p>
      </div>
      <div v-if="index === editIndex"> 
        <label for="pet_name">Point : </label>
        <input type="number" v-model="form.pet_point" id="input-default">
      </div>

      <div v-if="!isAdmin()">
        <button @click="decreaseUserPoint(pet.id)">Purchase</button>
        <!--สมมติ points-->
      </div>
      <div v-if="isAdmin()">
        <div v-if="index !== editIndex">
          <button @click="openForm(index, pet)">Edit</button>
          <button @click="deleteItem(pet.id-1)">Delete</button>
        </div>
        <div v-if="index === editIndex">
          <button @click="editItem()">Update</button>
          <button @click="closeForm()">Cancel</button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import PetApi from "@/store/petApi";
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      pets: [],
      editIndex: -1,
      form: {
        id: "",
        pet_name: "",
        pet_rarity: "",
        pet_point: "",
        pet_image: "",
      },
    };
  },
  created() {
    this.fetchItem();
  },
  methods: {
    isAuthen() {
      return AuthUser.getters.isAuthen;
    },
    isAdmin() {
      if (AuthUser.getters.user.role.name === "Admin") {
        return true;
      }
      return false;
    },
    Testing() {
      console.log(AuthUser.getters.user);
    },
    async fetchItem() {
      await PetApi.dispatch("fetchItem");
      this.pets = PetApi.getters.pets;
    },
    openForm(index, pet) {
      //for admin
      this.editIndex = index;
      let cloned = JSON.parse(JSON.stringify(pet));
      this.form.pet_name = cloned.pet_name;
      this.form.pet_rarity = cloned.pet_rarity;
      this.form.pet_point = cloned.pet_point;
    },
    closeForm() {
      //for admin
      this.editIndex = -1;
      this.form = {
        id: "",
        pet_name: "",
        pet_rarity: "",
        pet_point: "",
        pet_image: "",
      };
    },
    openEditForm() {
      this.$router.push("/createPet");
    },
    async deleteItem(id) {
      this.$delete(this.pets, id)
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
      };
      await PetApi.dispatch("editItem", payload);
      this.closeForm();
      this.fetchItem();
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
      };
      let res = await PetApi.dispatch("addItem", payload);
      if (res.success) {
        this.closeForm();
        this.fetchItem();
      } else {
        console.log("Add mai dai");
        swal("Add Failed", res.message, "error");
      }
    },
    // calculateUserPoint(pet_id) {
    //   this.pets.forEach(function (pet) {
    //     if (pet_id === pet.id) {
    //       user_point -= parseInt(pet.pet_point);
    //     }
    //   });
    //   return user_point;
    // },
    decreaseUserPoint(pet_id) {
      //ลด point ของ user
      // swal({
      //   title: "Are you sure to buy this pet?",
      //   text: "If you click, You will receive a lovely pet!",
      //   icon: "warning",
      //   buttons: true,
      //   dangerMode: true,
      // }).then((willPurchase) => {
      //   if (willPurchase) {
      //     // calculateUserPoint(pet_id);
      //     swal("You received a lovely PET!", {
      //       icon: "success",
      //     });
      //     console.log(pet_id)
      //     return pet_id
      //   } else {
      //     swal("This pet so sad to you.");
      //   }
      // });
      console.log(pet_id)
      return pet_id;
    },
    // addPetToUser() {
    //   //เพิ่มสัตว์เลี้ยงให้ user
    // },
    getImage(url) {
      return "http://localhost:1337" + url;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
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
  margin: 10px;
}
.row:after {
  align-content: center;
  display: flex;
  clear: both;
}
#box {
  margin: 20px;
  margin-left: 50px;
  border-radius: 25px;
  background: #f6ffea;
  padding: 20px;
  width: fit-content;
  height: fit-content;
}
h2 {
  text-transform: capitalize;
  margin-top: 10px;
}
img {
  position: inherit;
  display: block;
  border-radius: 25px;
  width: 250px;
  height: 250px;
}
button,
.open-button {
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background: #fbc1ad;
  cursor: pointer;
}
#input-default {
  border: none;
  border-radius: 10px;
  margin: 5px;
  width: 150px;
}
button, #input-image {
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background: #fbc1ad;
  cursor: pointer;
}
select {
  margin-left: 5px;
}
</style>