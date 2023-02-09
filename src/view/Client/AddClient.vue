<template>
<div id="AddEmployee">
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
            <!-- Main Content Add Client-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">            
                            <div class="col-lg-12">
                                <div class="card">
                                    <form @submit.prevent="addClient">
                                    <div class="card-header">
                                        <strong>Form Add</strong> Client
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
//config global for localhost:3000
import config from "@/config"
//vuelidate for Validation form
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import NavBarComponent from '../../components/Header.vue'
import SideBarComponent from '../../components/Sidebar.vue'
export default {
  name: 'AddEmployee',
  components: {
    NavBarComponent,
    SideBarComponent
  },
  data() {
    return {
      items: [],
      client_name: ""
    }
  },
  //implementation Vuelidate
  validations: {
    client_name: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(2)
    }
  },
  methods: {
    //Add New Data Client
    async addClient() {
      try {
        this.$v.$touch();
        if(!this.$v.$invalid){
          const fd = new FormData();
          fd.set('client_name', this.client_name);
          await axios.post(`${config.apiUrl}/clien/add`, fd);
          //Sweet alert success
          this.$swal({
              icon: 'success',
              title: 'Add Client',
              text: 'Add Client Data Successfully',
          })
          this.$router.push("/client");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //Logout
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
  //Render Before Load Page For Check JWT
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