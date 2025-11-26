<template>
  <section class="container mt-4">
    <h2>Registrar Gasto</h2>

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
          <option value="efectivo">Efectivo</option>
          <option value="debito">Débito</option>
          <option value="credito">Crédito</option>
          <option value="transferencia">Transferencia</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Monto</label>
        <input type="number" v-model.number="form.amount" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Fecha</label>
        <input type="date" v-model="form.date" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Descripción</label>
        <input type="text" v-model="form.description" class="form-control" />
      </div>

      <button class="btn btn-primary" @click="submitForm">Agregar</button>

      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-success mt-2">{{ successMsg }}</p>

    </div>
  </section>
</template>

<script>
import { useExpenseStore } from "../stores/expenseStore";

export default {
  name: "ExpensesForm",
  data() {
    return {
      form: {
        category: "",
        amount: null,
        date: "",
        description: "",
        metodoPago: ""
      },
      errorMsg: "",
      successMsg: ""
    };
  },

  methods: {
    validate() {
      if (!this.form.category || !this.form.amount || !this.form.date || !this.form.description) {
        this.errorMsg = "Todos los campos son obligatorios.";
        return false;
      }

      if (this.form.amount <= 0) {
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

      this.form = { category: "", amount: null, date: "", description: "" };
    }
  }
};
</script>