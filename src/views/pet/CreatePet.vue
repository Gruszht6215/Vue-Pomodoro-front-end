<template>
  <div class="distance">
    <!-- <button @click="onUpload">Upload!</button> -->
    <h1>Add New Pet</h1><br>
    <form @submit.prevent="onSubmit">
      <img :src="previewImage" class="uploading-image"/>
      <input type="file" @change="onFileChanged"/>
      <div>
        <label for="name">Pet Name : </label>
        <input id="input-default"
          v-model="form.name"
          type="text"
          placeholder=" name"
          aria-autocomplete="none"
        />
      </div>
      <div>
        <label for="rarity">Pet Rarity : </label>
        <select v-model="form.rarity">
          <option disabled value="">Please select one</option>
          <option>Legendary</option>
          <option>Epic</option>
          <option>Rare</option>
          <option>Common</option>
        </select>
      </div>
      <div>
        <label for="point">Pet Point : </label>
        <input id="input-default" v-model="form.point" type="number" placeholder=" point" />
      </div>

      <div>
        <button>Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import PetApiStore from "@/store/petApi";

export default {
  data() {
    return {
      form: {
        name: "",
        rarity: "",
        point: "",
      },
      selectedFile: null,
      previewImage: null,
    };
  },
  methods: {
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("files", this.selectedFile);

      let payload = {
        pet_name: this.form.name,
        pet_rarity: this.form.rarity,
        pet_point: this.form.point,
        pet_image: formData,
        profile_owner: [],
      };
      PetApiStore.dispatch("addItem", payload);
      this.clearForm();
    },
    clearForm() {
      this.selectedFile = null;
      this.form = {
        name: "",
        rarity: "",
        point: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.uploading-image {
  display: flex;
}
#input-default {
  background-color: #e5e1e0;
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