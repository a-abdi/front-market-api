import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      auth: true
    },
    component: Profile,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: ( to, from, next ) => {
      const logedIn = localStorage.getItem('user');
      if(logedIn) {
        next('/about')
      } else {
        next()
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ( to, from, next ) => {
      const logedIn = localStorage.getItem('user');
      if(logedIn) {
        next('/about')
      } else {
        next()
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(( to, from, next ) => {
  const logedIn = localStorage.getItem('user');
  if( to.matched.some( record => record.meta.auth )) {
    if( logedIn ) {
      next()
    } else {
      next('/login')
    }
  } else{
    next()
  }
})

export default router;