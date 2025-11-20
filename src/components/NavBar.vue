<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/home" class="nav-link">Gastos</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/estadisticas" class="nav-link">Estadisticas</RouterLink>
                    </li>
                </ul>
                <div class="d-flex">
                    <p class="fs-5 fw-bold me-auto px-3 mt-3">Bienvenido: {{ userName }}</p>
                    <button class="btn btn-outline-success" @click="userLogout()">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '../stores/authStore.js';

export default {
    name: 'Navbar',
    components: {
    },
    data() {
        return {
            authStore: useAuthStore(),
            userName: ''
        };
    },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
        userLogout() {
            this.authStore.logout();
            this.goToLogin();
        },
        getUserName() {
            this.userName = this.authStore.getUserName;
        }
    },
    mounted() {
        this.getUserName();
    }
};
</script>

<style scoped>

</style>