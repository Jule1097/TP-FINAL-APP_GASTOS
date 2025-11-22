import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore.js";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Gastos from "../components/Gastos.vue";
import Estadisticas from "../components/Estadisticas.vue";

const routes = [
  { path: "/", component: Login},
  { path: "/home", component: Home, meta: { requiresAuth: true }},
  { path: "/gastos", component: Gastos, meta: { requiresAuth: true }},
  { path: "/register", component: Register,},
  { path: "/login", component: Login,},
  { path: "/estadisticas", component: Estadisticas, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login"); // si el usuario no esta autenticado, redirigir al login
  } else {
    next();
  }
});

export default router;
