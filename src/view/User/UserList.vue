<template>
<div id="EmployeeList">
  <NavBarComponent/>
  <SideBarComponent/>
  <router-view></router-view>
    <!-- Page Container-->
    <div class="page-container">
      <!-- Header Desktop-->
      <header class="header-desktop">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="header-wrap">
              <form class="form-header" action="" method="POST">
              </form>
              <div class="header-button">
                <div class="account-wrap">
                  <div class="account-item">
                    <div class="content">
                      <button @click="logout">Logout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- End Header Desktop -->
      <!-- Main Content User -->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row m-t-0">
              <div class="col-md-12">
                <div class="overview-wrap">
                  <h2 class="title-1">User</h2>
                </div><br>
                <!-- Search Box Data User -->
                <div class="card">
                  <div class="card-header">
                    <strong>Search</strong> User
                  </div>
                  <div class="card-body card-block">
                    <div class="row form-group">
                      <div class="col col-md-3">
                        <label for="text-input" class=" form-control-label">Search Name</label>
                      </div>
                      <div class="col-12 col-md-9">
                        <input type="text" id="text-input" placeholder="Input Name" v-model="name" class="form-control">      
                      </div>
                    </div>
                    <button class="btn btn-primary is-small" @click="searchUser">
                      <i class="fas fa-search"> Search</i>
                    </button>
                  </div>
                  <div class="card-footer">      
                  </div>
                </div>
                <!-- Show All Data User With Vue Good Table -->
                <div class="card">
                  <div class="card-header">
                    <router-link :to="{ name: 'addUser' }" class="btn btn-success float-left"><i class="far fa-plus-square"> Add User</i></router-link>
                  </div>
                  <div class="card-body card-block">
                    <div class="table-responsive m-b-40">
                      <vue-good-table :columns="columns" :rows="items" :line-numbers="true"
                                      :pagination-options="{
                                              enabled: true,
                                              perPage: 5
                                      }">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'before'"><center>
                            <a :href="`/#/user/update/${props.row.id}`"><button class="btn btn-info is-small"><i class="far fa-edit"> Edit</i></button></a>&nbsp;
                            <button class="btn btn-danger is-small" @click="deleteUser(props.row.id)"><i class="far fa-trash-alt"> Delete</i></button></center>
                          </span>
                          <span v-else>
                            {{props.formattedRow[props.column.field]}}
                          </span>
                        </template>
                      </vue-good-table>
                    </div>
                  </div>
                  <div class="card-footer">          
                  </div>
                </div>
                <!-- End Show Data User -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
// Axios
import axios from "axios";
// Set Global Configuration localhost 3000
import config from "@/config"
// Template Bootstrap Cool Admin
import NavBarComponent from '../../components/Header.vue'
import SideBarComponent from '../../components/Sidebar.vue'
// Vue Good Table
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
export default {
  name: 'ClientList',
  components: {
    NavBarComponent,
    SideBarComponent,
    VueGoodTable,
  },
  data() {
    return {
      name: "",
      items: [],
      columns: [
        {
          label: 'Username',
          field: 'username',
          thClass: 'text-center'
        },
        {
          label: 'Name',
          field: 'name',
          thClass: 'text-center'
        },
        {
          label:  'Email',
          field:  'email',
          thClass: 'text-center'
        },
        {
          label: 'Action',
          field: 'before',
          thClass: 'text-center',
          tdClass: 'text-center',
        }
      ],
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    // Get All Data User
    async getUser() {
      try {
        const response = await axios.get(`${config.apiUrl}/users/show`);
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    // Search User By Name User
    async searchUser(){
        const response = await axios.get(`${config.apiUrl}/users/search/${this.name}`);
        this.items = response.data;
        console.log(response);
    },
    // Delete User
    deleteUser(id) {
      this.$swal({
          title: 'Are you sure?',
          text: 'You can\'t revert your action',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes Delete it!',
          cancelButtonText: 'No, Keep it!',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {  
            axios.delete(`${config.apiUrl}/users/delete/${id}`)
            this.$swal('Deleted', 'Deleted User Data Successfully', 'success')
            .then(function(){
                  location.reload();
                });
            this.getUser();
          } else {
            this.$swal('Cancelled', 'Deleted User Data Is Not Successfully', 'error')
          }
        })
    },
    // Logout
    logout(){
      this.$swal({
        title: 'Are you sure for logout?',
        text: 'You can\'t revert your action',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
          if(result.value) {  
            localStorage.removeItem('token');
            const auth = localStorage.getItem('token');
            if(auth==null){
              this.$router.push("/");
            }
          } else {
            this.$swal('Cancelled', 'You Are Still Login', 'success')
          }
        })    
    },
  },
  // Render Before Load Page For Check JWT
  beforeMount () {
    const auth = localStorage.getItem('token')
      if(auth==null){
        this.$swal({
            icon: 'error',
            title: 'Invalid',
            text: 'Please Login',
        })
        this.$router.push("/");
    }
  }
};
</script>
<style>
table {
    counter-reset: tableCount;     
}
.counterCell:before {          
      font-weight: bold;    
    content: counter(tableCount); 
    counter-increment: tableCount; 
}
</style>