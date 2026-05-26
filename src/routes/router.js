import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Gastos from "../components/Gastos.vue";
import Estadisticas from "../components/Estadisticas.vue";
import ExpensesForm from "../components/ExpensesForm.vue";

const routes = [
  { 
    path: "/", 
    redirect: "/login"
  },
  { 
    path: "/gastos", 
    name: "Gastos", 
    component: Gastos, 
    meta: { requiresAuth: true }
  },
  { 
    path: "/register", 
    name: "Register", 
    component: Register 
  },
  { 
    path: "/login", 
    name: "Login", 
    component: Login 
  },
  { 
    path: "/expenses", 
    name: "ExpensesForm", 
    component: ExpensesForm, 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/estadisticas", 
    name: "Estadisticas", 
    component: Estadisticas, 
    meta: { requiresAuth: true } 
  },
  { 
    path: "/:pathMatch(.*)*", 
    redirect: "/login" 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if ( (to.path === "/login" || to.path === "/register") && authStore.isAuthenticated ) {
    next( "/gastos" );
  } else {
    next();
  }
});

export default router;
