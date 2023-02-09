<template>
<div id="UpdateEmployee">
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
        <!-- Main Content Form Edit Client-->
        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="row">            
                <div class="col-lg-12">
                  <div class="card">
                    <form @submit.prevent="updateClient">
                      <div class="card-header">
                        <strong>Form Update</strong> Client
                      </div>
                        <div class="card-body card-block">  
                          <div class="row form-group">
                            <div class="col col-md-3">
                              <label for="text-input" class=" form-control-label float-left">Client Name</label>
                            </div>
                              <div class="col-12 col-md-9">
                                <input type="text" id="text-input" placeholder="Input Client Name" v-model="client_name" class="form-control" pattern="[a-zA-Z ]+">
                                <span v-if="!$v.client_name.required && $v.client_name.$dirty" class="text-danger float-left">Client Name is required!</span>
                                <span v-if="(!$v.client_name.minLength || !$v.client_name.maxLength) && $v.client_name.$dirty" class="text-danger float-left">Client Name must be between {{ $v.client_name.$params.minLength.min}} and {{ $v.client_name.$params.maxLength.max}} characters!</span>      
                              </div>
                          </div>
                        </div>
                        <div class="card-footer">
                          <router-link to="/client">     
                            <button class="btn btn-danger is-small">
                              <i class="fas fa-step-backward"> Back</i>
                            </button>
                          </router-link>
                          &nbsp;
                          <button class="btn btn-primary is-small" type="submit">
                              <i class="fas fa-check"> Submit</i>
                          </button>
                        </div>
                    </form>
                  </div>     
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
//configuration localhost:3000 global
import config from "@/config"
//vuelidate (validation form)
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
//template bootstrap cool admin
import NavBarComponent from '../../components/Header.vue'
import SideBarComponent from '../../components/Sidebar.vue'
export default {
  name: 'UpdateEmployee',
  components: {
    NavBarComponent,
    SideBarComponent
  },
  data() {
    return {
      client_name: ""
    }
  },
  created() {
    this.getClientByID();
  },
  //implement vuelidate
  validations: {
    client_name: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(2)
    }
  },
  methods: {
    //get client data by id
    async getClientByID() {
      try {
        const response = await axios.get(`${config.apiUrl}/clien/show/${this.$route.params.id}`);
        this.client_name = response.data.client_name;    
        //console.log(response);
      } catch (err) {
        console.log(err);
      }
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
    //update client
    async updateClient() {
      try {
        this.$v.$touch();
        if(!this.$v.$invalid){
          const fd = new FormData();
          fd.set('client_name', this.client_name);
          await axios.put(`${config.apiUrl}/clien/update/${this.$route.params.id}`, fd);
          //Sweet alert success
          this.$swal({
              icon: 'success',
              title: 'Update Client',
              text: 'Update Client Data Successfully',
          })
          this.$router.push("/client");
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  //render before load page for check token jwt
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