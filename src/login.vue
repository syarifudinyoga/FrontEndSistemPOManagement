<template>
<div id="Login">
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <h3><b>PO Management</b></h3>
                        </div>
                        <div class="login-form">
                             <form @submit.prevent="loginSubmit"> 
                                <div class="form-group">
                                    <label class="float-left"><b>Username</b></label>
                                    <input class="au-input au-input--full" type="text" placeholder="Input username" v-model="username">
                                    <span v-if="!$v.username.required && $v.username.$dirty" class="text-danger float-left">Username is required!</span>
                                    <span v-if="(!$v.username.minLength || !$v.username.maxLength) && $v.username.$dirty" class="text-danger float-left">Username must be between {{ $v.username.$params.minLength.min}} and {{ $v.username.$params.maxLength.max}} characters!</span>
                                    <!--<span v-if="!$v.username.alpha && $v.username.$dirty" class="text-danger">Alpabet is required!</span>-->
                                </div><br>
                                <div class="form-group">
                                    <label class="float-left"><b>Password</b></label>
                                    <input class="au-input au-input--full" type="password" placeholder="Input Password" v-model="password">
                                    <span v-if="!$v.password.required && $v.password.$dirty" class="text-danger float-left">Password is required!</span>
                                    <span v-if="(!$v.password.minLength || !$v.password.maxLength) && $v.password.$dirty" class="text-danger float-left">Password must be between {{ $v.password.$params.minLength.min}} and {{ $v.password.$params.maxLength.max}} characters!</span>
                                </div><br>
                                <button class="au-btn au-btn--block au-btn--green m-b-20" type="submit" >Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from "axios";
import config from "@/config"
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: "Login",
  data() {
    return {
        username: '',
        password: ''
    };
  },
  validations: {
      username: {
          required,
          maxLength: maxLength(20),
          minLength: minLength(4)
      },
      password: {
          required,
          maxLength: maxLength(12),
          minLength: minLength(2)
      }
  },
  methods: {
    //Login
    async loginSubmit() {
        this.$v.$touch();
        if(!this.$v.$invalid){
            const response = await axios.post(`${config.apiUrl}/login/auth`, {
                username: this.username,
                password: this.password
            });
            const error = response.data.error;
            const token = response.data.token;
            if(error){
                //Sweet alert success
            this.$swal({
                icon: 'error',
                title: 'Invalid Login',
                text: error,
            })
            } else if(token){
                localStorage.setItem('token', response.data.token);
                //console.log(response);
                this.$router.replace(
                { name: 'dashboard', params: { ...this.$route.params } },
                () => {
                    this.$router.go(0);
                });
            }
        }
    },
  },
};
</script>
<style>
</style>