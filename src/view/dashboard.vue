<template>
<div id="Dashboard">
<NavBarComponent/>
<SideBarComponent/>
    <router-view></router-view>
    <div class="page-container">
            <!-- HEADER DESKTOP-->
            <header class="header-desktop">
                <div class="section__content section__content--p0">
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
            <!-- HEADER DESKTOP-->
            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="overview-wrap">
                                    <h2 class="title-1">Dashboard</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row m-t-25">
                            <div class="col-xl-3 col-lg-7">
                               <div class="card">
                                    <div class="card-body">
                                    <i class="fa fa-calendar fa-4x"></i>
                                    <h3>Client</h3>
                                    <h3>{{ clien }}</h3>
                                    </div>
                                    <div class="card-footer">
                                        <router-link to="/client"><a>More info <i class="fa fa-arrow-circle-right"></i></a></router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-7">
                               <div class="card">
                                    <div class="card-body">
                                    <i class="fas fa-users fa-4x"></i>
                                    <h3>Employee</h3>
                                    <h3>{{ employee }}</h3>
                                    </div>
                                    <div class="card-footer">
                                        <router-link to="/employee"><a>More info <i class="fa fa-arrow-circle-right"></i></a></router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-7">
                               <div class="card">
                                    <div class="card-body">
                                    <i class="fas fa-building fa-4x"></i>
                                    <h3>Employee in Work</h3>
                                    <h3>{{ employeeAllWork }}</h3>
                                    </div>
                                    <div class="card-footer">
                                        <router-link to="/employee"><a>More info <i class="fa fa-arrow-circle-right"></i></a></router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MAIN CONTENT-->
            <!-- END PAGE CONTAINER-->
    </div>
</div>
</template>

<script>
import axios from "axios";
import config from "@/config"
import NavBarComponent from '../components/Header.vue'
import SideBarComponent from '../components/Sidebar.vue'
export default {
  name: 'Dashboard',
    components: {
      NavBarComponent,
      SideBarComponent
    },
    data() {
        return {
            clien: [],
            employeeAllWork: [],
            employee: []
        }
    },
    created() {
        this.countAllClient();
        this.countAllEmployeeWork();
        this.countAllEmployee();
    },
    methods: {
        async countAllClient() {
            try {
                const response = await axios.get(`${config.apiUrl}/clien/countAll`);
                this.clien = response.data;
            } catch (err) {
                console.log(err);
            }
        },
        async countAllEmployee() {
            try {
                const response = await axios.get(`${config.apiUrl}/employee/countAll`);
                this.employee = response.data;
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        },
        async countAllEmployeeWork() {
            try {
                const response = await axios.get(`${config.apiUrl}/employee/countAllEmployeeWork`);
                this.employeeAllWork = response.data;
            } catch (err) {
                console.log(err);
            }
        },
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
    }
</script>