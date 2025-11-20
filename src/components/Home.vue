<template>
    <Navbar></Navbar>
</template>

<script>
import { GastosService } from '../services/gastos.service.js';
import Navbar from './Navbar.vue';

export default {
    name: 'Home',
    components: {
        Navbar
    },
    data() {
        return {
            gastosService : new GastosService(),
            gastos: [],
        };
    },
    methods: {
        async getAllGastos() {
            this.gastos = await this.gastosService.getGastos();
        },
    },
    mounted() {
        this.getAllGastos();
    }
};
</script>