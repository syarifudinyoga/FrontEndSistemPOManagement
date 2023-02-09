<template>
<div id="EmployeeList">
  <NavBarComponent/>
  <SideBarComponent/>
  <router-view></router-view>
    <!-- Page Container -->
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
      <!-- End Header Desktop-->
      <!-- Main Content Employee List -->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row m-t-0">
              <div class="col-md-12">
                <div class="overview-wrap">
                  <h2 class="title-1">Employee</h2>
                </div><br>
                  <!-- Search Box Employee List-->
                  <div class="card">
                    <div class="card-header">
                      <strong>Search</strong> Employee
                    </div>
                      <div class="card-body card-block">
                        <div class="row form-group">
                          <div class="col col-md-3">
                            <label for="text-input" class=" form-control-label">Employee NIK Or Name</label>
                          </div>
                            <div class="col-12 col-md-9">
                              <input type="text" id="text-input" placeholder="Input Employee NIK Or Name" v-model="nik_name" class="form-control">      
                            </div>
                        </div>
                          <button class="btn btn-primary is-small" @click="searchEmployee">
                            <i class="fas fa-search"> Search</i>
                          </button>
                      </div>
                      <div class="card-footer">      
                      </div>
                  </div>
                  <!-- Show All Data Employe Vue Good Table-->
                  <div class="card">
                    <div class="card-header">
                      <router-link :to="{ name: 'addEmployee' }" class="btn btn-success float-left"><i class="far fa-plus-square"> Add Employee</i></router-link>
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
                              <button class="btn btn-success is-small" @click="downloadSOW(props.row.sow_att.url)"><i class="fas fa-download"> Download Sow</i></button>&nbsp;
                              <button class="btn btn-success is-small" @click="downloadQuotation(props.row.quotation_att.url)"><i class="fas fa-download"> Download Quo</i></button>&nbsp;
                              <button class="btn btn-success is-small" @click="downloadPO(props.row.po_att.url)"><i class="fas fa-download"> Download PO</i></button>&nbsp;
                              <a :href="`/#/employee/update/${props.row.id}`"><button class="btn btn-info is-small"><i class="far fa-edit"> Edit</i></button></a>&nbsp;
                              <button class="btn btn-danger is-small" @click="deleteEmployee(props.row.id)"><i class="far fa-trash-alt"> Delete</i></button></center>
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
                  <!-- End Content Show All Data -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
//Axios
import axios from "axios";
//Config localhost:3000 global
import config from "@/config"
//Template bootstrap Cool Admin
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
          label: 'NIK',
          field: 'nik',
          thClass: 'text-center'
        },
        {
          label: 'Name',
          field: 'name',
          thClass: 'text-center'
        },
        {
          label:  'Client',
          field:  'client_name',
          thClass: 'text-center'
        },
        {
          label:  'Period From',
          field:  'period_from',
          thClass: 'text-center',
          tdClass: 'text-center'
        },
        {
          label:  'Period To',
          field:  'period_to',
          thClass: 'text-center',
          tdClass: 'text-center'
        },
        {
          label: 'Action',
          field: 'before',
          sortable: 'false',
          thClass: 'text-center'
        }
      ],
    }
  },
  created() {
    this.getEmployee();
  },
  methods: {
    //Get All Data Employee
    async getEmployee() {
      try {
        const response = await axios.get(`${config.apiUrl}/employee/show`);
        this.items = response.data;
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    // Search Data Employee
    async searchEmployee(){
        const response = await axios.get(`${config.apiUrl}/employee/search/${this.nik_name}`);
        this.items = response.data;
        console.log(response);
    },
    // Download File Sow
    downloadSOW(filePdf){
      axios({
      url: `${config.apiUrl}/${filePdf}`,
      method: 'GET',
      responseType: 'blob', // important
      }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePdf);
      document.body.appendChild(link);
      link.click();
      });
    },
    // Download File Quotation
    downloadQuotation(filePdf){
      axios({
      url: `${config.apiUrl}/${filePdf}`,
      method: 'GET',
      responseType: 'blob', // important
      }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePdf);
      document.body.appendChild(link);
      link.click();
      });
    },
    // Download File PO
    downloadPO(filePdf){
      axios({
      url: `${config.apiUrl}/${filePdf}`,
      method: 'GET',
      responseType: 'blob', // important
      }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePdf);
      document.body.appendChild(link);
      link.click();
      });
    },
    // Delete Data Employee By ID
    deleteEmployee(id) {
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
            axios.delete(`${config.apiUrl}/employee/delete/${id}`)
            this.$swal('Deleted', 'Deleted Employee Data Successfully', 'success')
            .then(function(){
                  location.reload();
                });
            this.getEmployee();
          } else {
            this.$swal('Cancelled', 'Deleted Employee Data Is Not Successfully', 'error')
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