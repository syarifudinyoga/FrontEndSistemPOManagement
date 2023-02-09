<template>
<div id="UpdateEmployee">
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
                        <div class="row">            
                            <div class="col-lg-12">
                                <div class="card">
                                    <form @submit.prevent="updateEmployee">
                                    <div class="card-header">
                                        <strong>Form Update</strong> Employee
                                    </div>
                                    <div class="card-body card-block">
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <label for="select" class=" form-control-label float-left">NIK</label>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <select name="select" id="select" class="form-control" @change="getNamaBas(nik)" v-model="nik" required>
                                                    <option v-for="n in bas" :key="n.NIK" v-bind:value="n.NIK">{{n.NIK}} - {{n.NAME}}</option>
                                                </select>
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
                                                <label for="select" class=" form-control-label float-left">Client Name</label>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <select name="select" id="select" class="form-control" v-model="clien_id" required>
                                                    <option v-for="cl in items" :key="cl.clien_id" v-bind:value="cl.clien_id">{{cl.client_name}}</option>
                                                </select>
                                            </div>
                                        </div>    
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <label for="text-input" class=" form-control-label float-left">Period From</label>
                                            </div>
                                            <div class="col-12 col-md-2">
                                                <input type="date" id="text-input" placeholder="Input Period" v-model="period_from" class="form-control" required>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <label for="text-input" class=" form-control-label float-left">Period To</label>
                                            </div>
                                            <div class="col-12 col-md-2">
                                                <input type="date" id="text-input" placeholder="Input Name" v-model="period_to" class="form-control" required>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <label for="file-input" class=" form-control-label float-left">File SOW <b>(Pdf,docx,doc,txt,jpg,jpeg,png)</b></label>
                                            </div>
                                            <div class="col-12 col-md-4">
                                                <input type="file" id="file-input" @change="onFileSelected" class="form-control-file" required>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <button class="btn btn-success btn-sm float-left" @click="downloadSOW(sow_att.url)">Download Old File SOW</button>
                                            </div>
                                            <div class="col-12 col-md-9">
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <label for="file-input" class=" form-control-label float-left">File Quotation <b>(Pdf,docx,doc,txt,jpg,jpeg,png)</b></label>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <input type="file" id="file-input" @change="onFileSelectedQuotation" class="form-control-file" required>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <button class="btn btn-success btn-sm float-left" @click="downloadQuotation(quotation_att.url)">Download Old File Quotation</button>
                                            </div>
                                            <div class="col-12 col-md-9">
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <label for="file-input" class=" form-control-label float-left">File PO <b>(Pdf,docx,doc,txt,jpg,jpeg,png)</b></label>
                                            </div>
                                            <div class="col-12 col-md-9">
                                                <input type="file" id="file-input" @change="onFileSelectedPo" class="form-control-file" required>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col col-md-3">
                                                <button class="btn btn-success btn-sm float-left" @click="downloadPO(po_att.url)">Download Old File PO</button>
                                            </div>
                                            <div class="col-12 col-md-9">        
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <router-link to="/employee">     
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
// Global Config localhost:3000
import config from "@/config"
// Template Admin Cool Admin
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
            items: [],
            bas: [],
            nik: "",
            name: "",
            clien_id: "",
            period_from: "",
            period_to: "",
            sow_att: null,
            quotation_att: null,
            po_att:null
        }
    },
    created() {
        this.getEmployee();
        this.getEmployeeByID();
        this.getNikBas();
        this.getNamaBas();
    },
    methods: {
        // Upload Sow
        onFileSelected(event){
            this.sow_att = event.target.files[0]
        },
        // Upload Quotation
        onFileSelectedQuotation(event){
            this.quotation_att = event.target.files[0]
        },
        // Upload Po
        onFileSelectedPo(event){
            this.po_att = event.target.files[0]
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
        // Show All Data Employee
        async getEmployee() {
            try {
                const response = await axios.get(`${config.apiUrl}/clien/show`);
                this.items = response.data;
            } catch (err) {
                console.log(err);
            }
        },
        // Show Data Employee By ID Selected
        async getEmployeeByID() {
            try {
                const response = await axios.get(
                `${config.apiUrl}/employee/show/${this.$route.params.id}`
                );
                    this.nik = response.data.nik;
                    this.name = response.data.name;
                    this.clien_id = response.data.clien_id;
                    this.period_from = response.data.period_from;
                    this.period_to = response.data.period_to;
                    this.sow_att = response.data.sow_att;
                    this.quotation_att = response.data.quotation_att;
                    this.po_att = response.data.po_att;
                console.log(response);
                
            } catch (err) {
                console.log(err);
            }
        },
        // Get All Data From API Bas
        async getNikBas() {
            try{
                const response = await axios.get("http://bas.ptbsp.com/api/integreted/comboUser");
                this.bas = response.data;
                console.log(this.bas)
            } catch (err){
                console.log(err);
            }
        },
        // Get Data NAME From API BAS IF NIK Selected
        async getNamaBas(value) {   
            try{
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
            } catch (err){
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
        // Update Data Employee 
        async updateEmployee() {
            try {
                const fd = new FormData();
                fd.set('nik', this.nik);
                fd.set('name', this.name);
                fd.set('clien_id', this.clien_id);
                fd.set('period_from', this.period_from);
                fd.set('period_to', this.period_to);
                fd.append('sow_att', this.sow_att, this.sow_att.name);
                fd.append('quotation_att', this.quotation_att, this.quotation_att.name);
                fd.append('po_att', this.po_att, this.po_att.name);
                await axios.put(`${config.apiUrl}/employee/update/${this.$route.params.id}`, fd);
                //Sweet alert update
                this.$swal({
                    icon: 'success',
                    title: 'Success',
                    text: 'Update Employee Data Successfully',
                })
                this.$router.push("/employee");
            } catch (err) {
                console.log(err);
            }
        }
    },
    // Rendering Before Load Page For Check JWT
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