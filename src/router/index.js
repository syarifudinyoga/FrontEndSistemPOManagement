import Vue from 'vue'
import Router from 'vue-router'
import Login from '../login'
import Dashboard from '@/view/dashboard'
import ClientList from '@/view/Client/ClientList'
import AddClien from '@/view/Client/AddClient'
import UpdateClien from '@/view/Client/UpdateClient'
import EmployeeList from '@/view/Employee/EmployeeList'
import AddEmployee from '@/view/Employee/AddEmployee'
import UpdateEmployee from '@/view/Employee/UpdateEmployee'
import UserList from '@/view/User/UserList'
import AddUser from '@/view/User/AddUser'
import UpdateUser from '@/view/User/UpdateUser'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '/',
            component: Login,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/client',
            name: 'client',
            component: ClientList,
        },
        {
            path: '/clien/add',
            name: 'addClien',
            component: AddClien,
        },
        {
            path: '/clien/update/:id',
            name: 'updateClien',
            component: UpdateClien,
        },
        {
            path: '/employee',
            name: 'employee',
            component: EmployeeList,
        },
        {
            path: '/employee/add',
            name: 'addEmployee',
            component: AddEmployee,
        },
        {
            path: '/employee/update/:id',
            name: 'updateEmployee',
            component: UpdateEmployee,
        },
        {
            path: '/user',
            name: 'user',
            component: UserList,
        },
        {
            path: '/user/add',
            name: 'addUser',
            component: AddUser,
        },
        {
            path: '/user/update/:id',
            name: 'updateUser',
            component: UpdateUser,
        }
    ]
});