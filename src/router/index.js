import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/Welcome.vue'

import Companies from '../components/company/Index.vue'
import CompanyAdd from '../components/company/Create.vue'
import EditCompany from '../components/company/Edit.vue'

import Employees from '../components/employee/Index.vue'
import EmployeeAdd from '../components/employee/Create.vue'
import EditEmployee from '../components/employee/Edit.vue'

import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'

function guard(to, from, next){
  if(localStorage.getItem('access_token')) {
      next(); // allow to enter route
  } else{
      next('/login'); // go to '/login';
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter : guard,
      component: Welcome
    },
    {
      path: '/companies',
      name: 'companies',
      beforeEnter : guard,
      component: Companies
    },
    {
      path: '/companies/create',
      name: 'companyAdd',
      beforeEnter : guard,
      component: CompanyAdd
    },
    {
      path: '/companies/:id',
      name: 'companyEdit',
      beforeEnter : guard,
      component: EditCompany
    },

    {
        name: 'employeeList',
        path: '/employees',
        beforeEnter : guard,
        component: Employees
    },
    {
        name: 'employeeEdit',
        path: '/employee/:id/edit',
        beforeEnter : guard,
        component: EditEmployee
    },
    {
        name: 'employeeAdd',
        path: '/employee/add',
        beforeEnter : guard,
        component: EmployeeAdd
    },
  ]
})

export default router