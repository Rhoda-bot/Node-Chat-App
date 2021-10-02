import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Onlineuser from '../views/Onlineusers.vue'
import Chats from "../views/Chats.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path:'/signup',
    name:'SignUp',
    component:Signup
  },
  {
    path:'/chats/:email',
    name:'Chats',
    component:Chats
  },
  {
    path:'/signin',
    name:'SignIn',
    component:Signin
  },
  {
    path:'/onlineusers/:email',
    name:'Onlineuser',
    component:Onlineuser
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
