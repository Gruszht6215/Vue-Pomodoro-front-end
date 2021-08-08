<template>
  <div class="body">
      <div class="distance">
      <h3>Receive Leader Board</h3>
      <table class="table table-striped">
          <thead>
              <tr>
                <th>Email</th>
                <th>Received Point</th>
                <th>Date</th>
              </tr>
          </thead>
          <tbody>
                <tr v-for="(lead, index) in leaders" :key="index">
                <td v-if="(lead.point_type === 'Receive')">{{ lead.user_email }}</td>
                <td v-if="(lead.point_type === 'Receive')">{{ lead.point_amount }}</td>
                <td v-if="(lead.point_type === 'Receive')">{{ lead.active_date.substring(0,10)}}</td>
                </tr>
          </tbody>
      </table>
      <div>
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

                <td v-if="(lead.point_type === 'Spend')">{{ lead.user_email }}</td>
                <td v-if="(lead.point_type === 'Spend')">{{ lead.point_amount }}</td>
                <td v-if="(lead.point_type === 'Spend')">{{ lead.active_date.substring(0,10)}}</td>
                </tr>
          </tbody>
      </table>
      
      </div>
  </div>
  </div> 
</template>

<script scr="./src/tablesort.js">
    import LeaderBoardApiStore from "@/store/LeaderBoardApi.js";

export default {
    data(){
        return{
            leaders: [],
            editIndex: -1,
            form:{
                id:"",
                user_email:"",
            }
        }
    },
    created(){
    this.fetchLeader()
    },
    methods:{
        async fetchLeader(){
            await LeaderBoardApiStore.dispatch("fetchLeader")
            this.leaders = LeaderBoardApiStore.getters.leaders
        },
    }
    
}
</script>

<style lang="scss">
.body {
    width: 100%;
    display: block;
    text-align: center;
    background: #ffffff;
}
.distance {
    margin-top: 50px;
}
h3 {
    padding: 20px;
}
table,td,th, tr {
    background-color: #e5e1e0;
}
table {
    border-collapse: collapse;
}
</style>>
