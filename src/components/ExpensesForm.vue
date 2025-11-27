<template>
  <NavBar></NavBar>
  <section class="container mt-4">
    <h2 class="my-3">Registrar Gasto</h2>

    <div class="card p-3">

      <div class="mb-3">
        <label>Categoría</label>
        <select v-model="form.category" class="form-control">
          <option value="">Seleccione...</option>
          <option>Comida</option>
          <option>Transporte</option>
          <option>Servicios</option>
          <option>Otros</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Método de pago</label>
        <select v-model="form.metodoPago" class="form-select" required>
          <option value="" disabled>Seleccionar...</option>
          <option >Efectivo</option>
          <option >Debito</option>
          <option >Credito</option>
          <option >Transferencia</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Monto</label>
        <input type="number" step="any" v-model.number="form.monto" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Fecha</label>
        <input type="date" v-model="form.fechaGasto" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Descripción</label>
        <input type="text" v-model="form.descripcionGasto" class="form-control" />
      </div>

      <button class="btn btn-primary" @click="submitForm">Agregar</button>

      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-success mt-2">{{ successMsg }}</p>

    </div>
  </section>
</template>

<script>
import { useExpenseStore } from "../stores/expenseStore";
import NavBar from './Navbar.vue';

export default {
  name: "ExpensesForm",
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        category: "",
        monto: null,
        fechaGasto: "",
        descripcionGasto: "",
        metodoPago: ""
      },
      errorMsg: "",
      successMsg: ""
    };
  },

  methods: {
    validate() {
      if (!this.form.category || !this.form.monto || !this.form.fechaGasto || !this.form.descripcionGasto || !this.form.metodoPago) {
        this.errorMsg = "Todos los campos son obligatorios.";
        return false;
      }

      if (this.form.monto <= 0) {
        this.errorMsg = "El monto debe ser mayor a 0.";
        return false;
      }

      return true;
    },

    async submitForm() {
      this.errorMsg = "";
      this.successMsg = "";

      if (!this.validate()) return;

      const store = useExpenseStore();
      await store.addExpense(this.form);

      this.successMsg = "Gasto registrado con éxito.";

      this.form = { category: "", monto: null, fechaGasto: "", descripcionGasto: "", metodoPago: "" };
    }
  }
};
</script>