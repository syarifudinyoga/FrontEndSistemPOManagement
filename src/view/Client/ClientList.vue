<template>
<div id="ClientList">
  <NavBarComponent/>
  <SideBarComponent/>
  <router-view></router-view>
    <!-- PAGE CONTAINER-->
    <div class="page-container">
      <!-- HEADER DESKTOP-->
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
      <!-- END HEADER DESKTOP-->
      <!-- MAIN CONTENT-->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row m-t-0">
              <div class="col-md-12">
                <div class="overview-wrap">
                  <h2 class="title-1">Client</h2>
                </div><br>
                  <!-- Content Search Client-->
                  <div class="card">
                    <div class="card-header">
                      <strong>Search</strong> Client
                    </div>
                      <div class="card-body card-block">
                        <div class="row form-group">
                          <div class="col col-md-3">
                            <label for="text-input" class=" form-control-label">Client Name</label>
                          </div>
                          <div class="col-12 col-md-9">
                            <input type="text" id="text-input" placeholder="Input Client Name" v-model="client_name" class="form-control">      
                          </div>
                        </div>
                        <button class="btn btn-primary is-small" @click="searchClient">
                          <i class="fas fa-search"> Search</i>
                        </button>
                      </div>
                      <div class="card-footer">                  
                      </div>
                  </div>
                  <!-- Content Table Vue Good Table-->
                  <div class="card">
                    <div class="card-header">
                      <router-link :to="{ name: 'addClien' }" class="btn btn-success float-left"><i class="far fa-plus-square"> Add Client</i></router-link>
                    </div>
                      <div class="card-body card-block">
                        <div class="table-responsive m-b-40">
                          <vue-good-table :columns="columns" :rows="items" :line-numbers="true"
                                          :pagination-options="{
                                              enabled: true,
                                              perPage: 5
                                          }"
                          >
                            <template slot="table-row" slot-scope="props">
                              <span v-if="props.column.field == 'before'"><center>
                                <a :href="`/#/clien/update/${props.row.clien_id}`"><button class="btn btn-info is-small"><i class="far fa-edit"> Edit</i></button></a>&nbsp;
                                <button class="btn btn-danger is-small" @click="deleteClient(props.row.clien_id)"><i class="far fa-trash-alt"> Delete</i></button></center>
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
                  <!-- End Content Table Vue Good Table-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
//axios
import axios from "axios";
//Configuration localhost:3000 Global
import config from "@/config"
//Template Bootstrap Cool Admin
import NavBarComponent from '../../components/Header.vue'
import SideBarComponent from '../../components/Sidebar.vue'
//Vue Good Table
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
    items: [],
    columns: [
        {
          label: 'Client Name',
          field: 'client_name',
          thClass: 'text-center'
        },
        {
          label: 'Created Date',
          field: 'created_at',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
          dateOutputFormat: 'dd-MM-yyyy HH:mm',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          label: 'Action',
          field: 'before',
          tdClass: 'text-center',
          thClass: 'text-center'
        }
      ],
    }
  },
  created() {
    this.getClient();
  },
  methods: {
    //get all client data
    async getClient() {
      try {
        const response = await axios.get(`${config.apiUrl}/clien/show`);
        this.items = response.data;
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    //search client data by name
    async searchClient(){
        const response = await axios.get(`${config.apiUrl}/clien/search/${this.client_name}`);
        this.items = response.data;
        console.log(response);
    },
    //logout
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
    //delete client data
    deleteClient(id) {
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
            axios.delete(`${config.apiUrl}/clien/delete/${id}`)
            .then(response => { //Respon status 400
              const success = JSON.parse(response.status)
              console.log(success)
              if(success){
                this.$swal('Deleted', 'Deleted Client Data Successfully', 'success')
                .then(function(){
                  location.reload();
                });
              }
            })
            .catch(error => { //Respon selain status 400 Misal (500)
              const errorMessage = JSON.parse(error.response.status)
              console.log(errorMessage)
              if(errorMessage){
                this.$swal('Foreign Key', 'Data Use By Employee' , 'error')
                .then(function(){
                  location.reload();
                });
              }
            })
          } else {
            this.$swal('Cancelled', 'Deleted Client Data Is Not Successfully', 'error')
          }
        })
    },
  },
  //render before load page for chech item token jwt
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