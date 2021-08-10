<template>
  <div class="row">
    <div>
      <button v-if="isAdmin()" class="open-button" @click="openAddForm()">
      Add new pet
    </button>
    <div v-if="!isAdmin()">
      <h4>Hi, {{ profileName }}</h4>
      <h5>you have {{ showProfilePoint }} points</h5><br>
    </div>
    </div>
    <div
      class="column"
      id="box"
      v-for="(pet, index) in pets"
      v-bind:key="index"
    >
      <div v-if="!isDeleted(pet.pet_name)">
        <div v-if="index !== editIndex">
          <img :src="getImage(pet.pet_image.url)" />
        </div>
        <!-- <div v-if="index === editIndex"> 
        เปลี่ยนรูปภาพโดยที่รูปเดิมยังอยู่
      </div> -->
        <div v-if="index !== editIndex">
          <h2>
            <i>{{ pet.pet_name }}</i>
          </h2>
        </div>
        <div v-if="index !== editIndex">
          <p>Rarity : {{ pet.pet_rarity }}</p>
        </div>
        <div v-if="index !== editIndex">
          <p>Point : {{ pet.pet_point }} points</p>
        </div>

        <div v-if="index === editIndex">
          <form @submit.prevent="onSubmitEdit">
            <div v-if="index === editIndex">
              <label for="pet_name">Name : </label>
              <input id="inputEditForm" type="text" v-model="form.pet_name" />
            </div>

            <label for="pet_name">Rarity : </label>
            <select v-model="form.pet_rarity">
              <option disabled value="">Please select one</option>
              <option>Legendary</option>
              <option>Epic</option>
              <option>Rare</option>
              <option>Common</option>
            </select>

            <div v-if="index === editIndex">
              <label for="pet_name">Point :</label>
              <input id="inputEditForm" type="number" v-model="form.pet_point" />
            </div>

            <input type="file" @change="onFileChanged" />

            <div v-if="index === editIndex">
              <button>Update</button>
              <button @click="closeForm()">Cancel</button>
            </div>
          </form>
        </div>

        <div v-if="!isAdmin() && index !== editIndex">
          <div v-if="!isPurchased(pet.id)">
            <button @click="purchase(index, pet)">Purchase</button>
          </div>
          <div v-if="isPurchased(pet.id)">
            <h3>purchased</h3>
          </div>
        </div>

        <div v-if="isAdmin()">
          <div v-if="index !== editIndex">
            <button @click="openForm(index, pet)">Edit</button>
            <button @click="deleteItem(index, pet)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <button @click="Testing()">test</button> -->
  </div>
</template>

<script>
import PetApi from "@/store/petApi";
import AuthUser from "@/store/AuthUser";
import ProfileApi from "@/store/ProfileApi";
import LeaderboardApi from "@/store/LeaderBoardApi";

export default {
  data() {
    return {
      pets: [],
      editIndex: -1,
      selectedFile: null,
      form: {
        id: "",
        pet_name: "",
        pet_rarity: "",
        pet_point: "",
        pet_image: "",
      },
      profileId: "",
      profileName: "",
      profilePoint: 0,
      profileCollection: [],
    };
  },
  created() {
    this.fetchItem();
    this.fetchProfile();
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
    isPurchased(pet_id) {
      for (let i = 0; i < this.profileCollection.length; i++) {
        // console.log(this.profileCollection[i]);
        if (pet_id == this.profileCollection[i].id) {
          return true;
        }
      }
      return false;
    },
    isDeleted(pet_name) {
      if (pet_name.substring(0, 7) === "@delete") {
        return true;
      }
      return false;
    },
    // Testing() {
    //   this.isPurchased(7);
    //   console.log(this.profileCollection);
    // },
    async fetchItem() {
      await PetApi.dispatch("fetchItem");
      this.pets = PetApi.getters.pets;
    },
    async fetchProfile() {
      await ProfileApi.dispatch("fetchItem", AuthUser.getters.user.id);
      this.profileId = ProfileApi.getters.profile(
        AuthUser.getters.user.username
      ).id;
      this.profilePoint = ProfileApi.getters.profile(
        AuthUser.getters.user.username
      ).profile_point;
      this.profileName = ProfileApi.getters.profile(
        AuthUser.getters.user.username
      ).profile_user.username;
      this.profileCollection = ProfileApi.getters.profile(
        AuthUser.getters.user.username
      ).pet_collection;
    },
    openForm(index, pet) {
      //for admin
      this.editIndex = index;
      let cloned = JSON.parse(JSON.stringify(pet));
      this.form.id = cloned.id;
      this.form.pet_name = cloned.pet_name;
      this.form.pet_rarity = cloned.pet_rarity;
      this.form.pet_point = cloned.pet_point;
    },
    closeForm() {
      //for admin
      this.editIndex = -1;
      this.selectedFile = null;
      this.form = {
        id: "",
        pet_name: "",
        pet_rarity: "",
        pet_point: "",
        pet_image: "",
      };
    },
    openAddForm() {
      this.$router.push("/createPet");
    },
    async deleteItem(index, pet) {
      console.log(pet);
      this.editIndex = index;
      let payload = {
        index: this.editIndex,
        id: pet.id,
        pet_name: "@delete" + pet.pet_name,
      };
      await PetApi.dispatch("deleteItem", payload);
      swal("Delete Success!", "", "success");
      this.closeForm();
    },

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
    },

    async onSubmitEdit() {
      const formData = new FormData();
      formData.append("files", this.selectedFile);
      let payload = {
        index: this.editIndex,
        id: this.form.id,
        pet_name: this.form.pet_name,
        pet_rarity: this.form.pet_rarity,
        pet_point: this.form.pet_point,
        pet_image: formData,
      };
      if (this.selectedFile === null) {
        payload.pet_image = null;
      }
      // console.log(payload);
      await PetApi.dispatch("editItem", payload);
      swal("Update Success!", "", "success");
      this.closeForm();
    },

    async purchase(index, pet) {
      if (parseInt(this.profilePoint) <= parseInt(pet.pet_point)) {
        swal("Sorry", "You do not have enough point.", "warning");
      } else {
        //Profile part
        let totalPoint = parseInt(this.profilePoint) - parseInt(pet.pet_point);
        let profileCollection = ProfileApi.getters
          .profile(AuthUser.getters.user.username)
          .pet_collection.map((pet) => pet.id);
        profileCollection.push(pet.id);

        let payload = {
          index: index,
          profile_id: this.profileId,
          profile_point: totalPoint,
          pet_collection: profileCollection,
        };
        await ProfileApi.dispatch("editProfile", payload);
        this.profilePoint = totalPoint;
        //Pet part

        //Leaderboard part
        let Leaderboard_payload = {
          point: pet.pet_point,
          pointType: "Spend",
        };
        await LeaderboardApi.dispatch("addHistory", Leaderboard_payload);
        swal("Purchase Successful", "", "success");
        // this.fetchItem();
        this.$router.go();
      }
    },

    getImage(url) {
      return "http://localhost:1337" + url;
    },
  },
  computed: {
    showProfilePoint() {
      return this.profilePoint;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
@media screen {
  .column, .columnn {
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
  margin-left: 55px;
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
button,
#input-image {
  margin: 5px;
  text-align: center;
  border-radius: 10px;
  background: #fbc1ad;
  cursor: pointer;
}
select {
  margin-left: 5px;
}
#inputEditForm {
  background-color: #e5e1e0;
  border: none;
  border-radius: 10px;
  margin: 5px;
  width: 120px;
}
select {
  width: 120px;
}
</style>