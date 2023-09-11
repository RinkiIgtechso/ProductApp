import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from "../views/Login.vue";
import Details from '../views/Details.vue';

let auth = Boolean(localStorage.getItem('auth'));

let isuserLoggedIn = auth && true;

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      needsAuth: true
    }
  },
  {
    path: '/posts/:id',
    name: 'Details',
    component: Details,
    props: true,
    meta:{
      needsAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.needsAuth){
    if(isuserLoggedIn){
      next();
    }else{
      next("/");
    }
  }else{
    next();
  }
})

export default router
