<template>
<<<<<<< HEAD
  <div>
      <!-- <input type="date" v-model="mydate1">
      <input type="date" v-model="mydate2"> -->
      <div class="filter">
          Date filer :
      <date-picker v-model="mydate1" placeholder="Start date"></date-picker>
      To
      <date-picker v-model="mydate2" placeholder="End date"></date-picker>
     <button type="button" @click="save">Filter</button>
      </div>
      <div class="receive">
        <h3>Receive Leader Board</h3>
        <table class="table table-striped">
            <thead>
                <tr>
=======
  <div class="body">
      <div class="distance">
      <h3>Receive Leader Board</h3>
      <table class="table table-striped">
          <thead>
              <tr>
>>>>>>> origin/pangprapawarin
                <th>Email</th>
                <th>Received Point</th>
                <th>Date</th>
            </tr>
            </thead>
                <tbody>
                    <tr v-for="(lead, index) in leaders" :key="index">
                        <td v-if="((((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))>startDate 
                        && ((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))<endDate)
                        &&(lead.point_type === 'Receive'))|| (startDate==0 && (lead.point_type === 'Receive'))">{{ lead.user_email }}</td>
                        <td v-if="((((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))>startDate 
                        && ((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))<endDate)
                        &&(lead.point_type === 'Receive'))|| (startDate==0 && (lead.point_type === 'Receive'))">{{ lead.point_amount }}</td>
                        <td v-if="((((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))>startDate 
                        && ((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))<endDate)
                        &&(lead.point_type === 'Receive'))|| (startDate==0 && (lead.point_type === 'Receive'))">{{ lead.active_date.substring(0,10)}}</td>
                    </tr>
            </tbody>
        </table>
      </div>
      <div class="Spend">
            <h3>Spend Leader Board</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Spend Point</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lead, index1) in leaders" :key="index1">
                        <td v-if="((((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))>startDate 
                        && ((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))<endDate)
                        &&(lead.point_type === 'Spend'))|| (startDate==0 && (lead.point_type === 'Spend'))">
                        {{ lead.user_email }}</td>
                        <td v-if="((((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))>startDate 
                        && ((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))<endDate)
                        &&(lead.point_type === 'Spend'))|| (startDate==0 && (lead.point_type === 'Spend'))">
                        {{ lead.point_amount }}</td>
                        <td v-if="((((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))>startDate 
                        && ((lead.active_date.substring(0,4)*31536000)+(lead.active_date.substring(5,7)*2629800)+(lead.active_date.substring(8,10)*86400))<endDate)
                        &&(lead.point_type === 'Spend'))|| (startDate==0 && (lead.point_type === 'Spend'))">{{ lead.active_date.substring(0,10)}}</td>
                    </tr>
                </tbody>
            </table>
      </div>
  </div>
  </div> 
</template>

<script scr="./src/tablesort.js">
    import LeaderBoardApiStore from "@/store/LeaderBoardApi.js";
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    export default {
        components: {DatePicker},
    data(){
        return{
            startDate: "",
            endDate: "",
            mydate1: '',
            mydate2: '',
            result1:{
                date:"",
                month:""+1,
                year:"",
            },
            result2:{
                date:"",
                month:""+1,
                year:"",
            },
            leaders: [],
            time3: "",
            editIndex: -1,
            form:{
                id:"",
                user_email:"",
            },
        }
    },
    created(){
    this.fetchLeader()
    },
    mounted(){
    if(!this.isAuthen()){
      swal("Restricted Area", "Please, login first", "wwarning");
      this.$router.push("/login");
    }
    },
    methods:{
        async fetchLeader(){
            await LeaderBoardApiStore.dispatch("fetchLeader")
            this.leaders = LeaderBoardApiStore.getters.leaders
            console.log(this.mydate)
        },
        save () {
                this.result1.month = this.mydate1.getMonth()+1
                this.result1.year = this.mydate1.getFullYear()+'-'+this.result1.month+'-'+this.mydate1.getDate();
                this.result2.month = this.mydate2.getMonth()+1
                this.result2.year = this.mydate2.getFullYear()+'-'+this.result2.month+'-'+this.mydate2.getDate();
                // this.result1.month = this.mydate1.getMonth()
                // this.result1.date = this.mydate1.getDate()
                // this.result2.year = this.mydate2.getFullYear();
                // this.result2.month = this.mydate2.getMonth()
                // this.result2.date = this.mydate2.getDate()
                this.startDate = ((this.mydate1.getFullYear())*31536000)+((this.mydate1.getMonth()+1)*2629800)+(this.mydate1.getDate()*86400)
                this.endDate = ((this.mydate2.getFullYear())*31536000)+((this.mydate2.getMonth()+1)*2629800)+(this.mydate2.getDate()*86400)
            },
            
        
    },
    
    
}
</script>

<style>

/* h3{
    display: block;
    text-align: center;
} */
.filter{
    margin-top: 20px;
    margin-bottom: 20px ;
}
</style>>
