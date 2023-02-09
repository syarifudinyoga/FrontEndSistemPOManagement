<template>
<div id="UpdateEmployee">
  <NavBarComponent/>
  <SideBarComponent/>
    <router-view></router-view>
    <!-- Page Container -->
    <div class="page-container">
      <!-- Header Desktop -->
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
      <!-- Main Content -->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">            
              <div class="col-lg-12">
                <div class="card">
                  <form @submit.prevent="updateUser">
                    <div class="card-header">
                      <strong>Form Update</strong> User
                    </div>
                    <div class="card-body card-block">  
                      <div class="row form-group">
                        <div class="col col-md-3">
                          <label for="text-input" class=" form-control-label float-left">Username</label>
                        </div>
                        <div class="col-12 col-md-9">
                          <input type="text" id="text-input" placeholder="Input Client Name" v-model="username" class="form-control" readonly>                                
                        </div>
                      </div>                
                      <div class="row form-group">
                        <div class="col col-md-3">
                          <label for="text-input" class=" form-control-label float-left">Password</label>
                        </div>
                        <div class="col-12 col-md-9">
                          <input type="password" id="text-input" placeholder="Input Password" v-model="password" class="form-control" required>
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col col-md-3">
                          <label for="text-input" class=" form-control-label float-left">Name</label>
                        </div>
                        <div class="col-12 col-md-9">
                          <input type="text" id="text-input" placeholder="Input name" v-model="name" class="form-control" readonly>
                        </div>
                      </div>
                      <div class="row form-group">
                        <div class="col col-md-3">
                          <label for="text-input" class=" form-control-label float-left">Email</label>
                        </div>
                        <div class="col-12 col-md-9">
                          <input type="text" id="text-input" placeholder="Input email" v-model="email" class="form-control" readonly>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <router-link to="/user">     
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
// Axios
import axios from "axios";
// Config Global For localhost:3000
import config from "@/config"
// Vuelidate
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// Template Bootstrap Cool Admin
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
      username: "",
      password: "",
      name: "",
      email: ""
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required,
      maxLength: maxLength(12),
      minLength: minLength(4)
    },
    name: {
      required,
      maxLength: maxLength(2),
      minLength: minLength(30)
    }
  },
  created() {
    this.getUserByID();
  },
  methods: {
    // Get User By Id
    async getUserByID() {
      try {
        const response = await axios.get(
          `${config.apiUrl}/users/show/${this.$route.params.id}`
        );
            this.username = response.data.username;
            this.name = response.data.name;
            this.email = response.data.email;
            console.log(response);
      } catch (err) {
        console.log(err);
      }
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
    // Update User
    async updateUser() {
      try {
          const fd = new FormData();
          fd.set('username', this.username);
          fd.set('password', this.password);
          fd.set('name', this.name);
          await axios.put(`${config.apiUrl}/users/update/${this.$route.params.id}`, fd);
          //Sweet alert success
          this.$swal({
              icon: 'success',
              title: 'Update User',
              text: 'Update User Data Successfully',
          })
          this.$router.push("/user");
      } catch (err) {
        console.log(err);
      }
    }
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