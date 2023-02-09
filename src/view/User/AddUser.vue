<template>
<div id="AddEmployee">
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
                                <!-- Form Add User -->
                                <div class="card">
                                    <form @submit.prevent="addUser">
                                        <div class="card-header">
                                            <strong>Form Add</strong> User
                                        </div>
                                        <div class="card-body card-block">
                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="select" class=" form-control-label float-left">Username</label>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <select name="select" id="select" class="form-control" @change="getNamaBas(username)" v-model="username" required>
                                                        <option disabled value="">Select One NIK</option>
                                                        <option v-for="n in bas" :key="n.NIK" v-bind:value="n.NIK">{{n.NIK}} - {{n.NAME}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="text-input" class=" form-control-label float-left">Password</label>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input type="password" id="text-input" placeholder="Input password" v-model="password" class="form-control" required>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="text-input" class=" form-control-label float-left">Name</label>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input type="text" id="text-input" placeholder="Input Name" v-model="name" class="form-control" readonly>
                                                </div>
                                            </div>
                                            <div class="row form-group">
                                                <div class="col col-md-3">
                                                    <label for="text-input" class=" form-control-label float-left">Email</label>
                                                </div>
                                                <div class="col-12 col-md-9">
                                                    <input type="text" id="text-input" placeholder="Input Email" v-model="email" class="form-control" readonly>
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
// Config Global localhost:3000
import config from "@/config"
// Email Js
//import emailjs from 'emailjs-com';
// Template Bootstrap Cool Admin
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
            bas: [],
            username: "",
            password: "",
            name: "",
            email: ""
        }
    },
    created() {
        this.getNikBas();
        this.getNamaBas();
    },
    methods: {
        // Compare 2 Object Json and Push Array to Get Nik
        async getNikBas() {
            try{
                //url bas and local api
                const response = await axios.get("http://bas.ptbsp.com/api/integreted/comboUser");
                const response2 = await axios.get(`${config.apiUrl}/users/show`);
                // set response
                this.bas = response.data;
                this.usr = response2.data;
                // alias 
                const arrBas = this.bas;
                const arrUsr = this.usr;
                var arrNIK = []
                //console.log(arrBas.[2].NIK)
                //console.log(arrUsr.[0].username)
                //looping for checking
                for (let i = 0; i < arrBas.length; i++) {
                    let found = false
                    for (let j = 0; j < arrUsr.length && !found; j++) {
                    found = arrBas[i].NIK === arrUsr[j].username
                    }
                    if (!found) arrNIK.push(arrBas[i])
                }
                console.log(arrNIK)
                //get all data after looping and this is new object 
                this.bas = arrNIK;
            } catch (err){
                console.log(err);
            }
        },
        // Get Name from API BAS where NIK Select
        async getNamaBas(value) {   
            try{
                // get raw header
                const response = await axios.get("http://bas.ptbsp.com/api/integreted/getUserInfo",{
                    headers: { 
                        'content-type': 'application/json' 
                    },
                    params: {
                        NIK: value
                    }
                });
                console.log(response.data.data.NAME);
                this.name = response.data.data.NAME;
                this.email = response.data.data.EMAIL;
            } catch (err){
                console.log(err);
            }
        },
        // Add New Data User
        async addUser() {
            await axios.post(`${config.apiUrl}/users/add`, {
                username: this.username,
                password: this.password,
                name: this.name,
                email: this.email
            });
            /*============================================================================ send email
            emailjs.init('user_rSWUmwQJfSY1eYMGqP45C')
            emailjs.send(
                'service_929vug3', 
                'template_x4dwaiy', 
                {name: this.name, from_name: "Admin PO Management", username: this.username, password: this.password, email: this.email}
            )
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
            }, (error) => {
                console.log('FAILED...', error);
            });
            */
            //Sweet alert success
            this.$swal({
                icon: 'success',
                title: 'Success',
                text: 'Add User Data Successfully',
            })
            this.$router.push("/user");
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