import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import RentTenant from '@/views/rent/Tenant.vue'
import RentHouse from '@/views/rent/House.vue'
import SearchTenant from '@/views/search/Tenant.vue'
import SearchHouse from '@/views/search/House.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import RentalDetail from '@/views/house/RentalDetail.vue'
import RentalHouseAdd from '@/views/house/RentalHouseAdd.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rent/house',
      name: 'rentHouse',
      component: RentHouse
    },
    {
      path: '/rental/room/add',
      name: 'rentalHouseAdd',
      component: RentalHouseAdd
    },
    {
      path: '/rent/tenant',
      name: 'rentTenant',
      component: RentTenant
    },
    {
      path: '/rental/detail/:id',
      name: 'rentalDetail',
      component: RentalDetail
    },
    {
      path: '/search/house',
      name: 'searchHouse',
      component: SearchHouse
    },
    {
      path: '/search/tenant',
      name: 'searchTenant',
      component: SearchTenant
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
