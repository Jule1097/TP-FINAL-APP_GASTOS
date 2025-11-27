<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Editar Gasto</h1>
          <button type="button" class="btn-close" @click="cerrarModal"></button>
        </div>
        <div class="modal-body">
          <section class="container mt-4">
            <div class="mb-3">
              <label class="form-label">Categoría</label>
              <select v-model="gastoEditado.category" class="form-control" required>
                <option value="" disabled>Seleccione...</option>
                <option value="Comida">Comida</option>
                <option value="Transporte">Transporte</option>
                <option value="Servicios">Servicios</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Método de pago</label>
              <select v-model="gastoEditado.metodoPago" class="form-select" required>
                <option value="" disabled>Seleccionar...</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Debito">Debito</option>
                <option value="Credito">Credito</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
            <div class="mb-3">
              <label>Monto</label>
              <input type="number" v-model.number="gastoEditado.monto" @change="formDirty.monto = true" class="form-control" />
                <div v-if="!validarMonto() && formDirty.monto" class="text-danger">
                  {{ validacionForm.mensajeMonto }}
                </div>
            </div>
            <div class="mb-3">
              <label>Fecha</label>
              <input type="date" v-model="gastoEditado.fechaGasto" @change="formDirty.fechaGasto = true" class="form-control" />
                <div v-if="!validarFecha() && formDirty.fechaGasto" class="text-danger">
                  {{ validacionForm.mensajeFecha }}
                </div>
            </div>
            <div class="mb-3">
              <label>Descripción</label>
              <input type="text" v-model="gastoEditado.descripcionGasto" @change="formDirty.descripcionGasto = true" class="form-control" />
                <div v-if="!validarDescripcion() && formDirty.descripcionGasto" class="text-danger">
                  {{ validacionForm.mensajeDescripcion }}
                </div>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="guardar" :disabled="puedeGuardar()">Guardar cambios</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

// Props y emits deben definirse al inicio
const props = defineProps({
  show: Boolean,
  gasto: Object
});

const emit = defineEmits(['close', 'saved']);

// Estado local
const gastoEditado = ref({});
const formDirty = ref({
  monto: false,
  fechaGasto: false,
  descripcionGasto: false
});

const validarMonto = () => gastoEditado.value.monto > 0 && gastoEditado.value.monto !== null;
const validarFecha = () => gastoEditado.value.fechaGasto && gastoEditado.value.fechaGasto.trim() !== '';
const validarDescripcion = () => gastoEditado.value.descripcionGasto && gastoEditado.value.descripcionGasto.trim() !== '';

// Computed para validaciones
const validacionForm = computed(() => {

  let mensajeMonto = '';
  if (!validarMonto()) {
    mensajeMonto = 'El monto es obligatorio y debe ser mayor a 0.\n';
  }

  let mensajeFecha = '';
  if (!validarFecha()) {
    mensajeFecha = 'La fecha es obligatoria.\n';
  }

  let mensajeDescripcion = '';
  if (!validarDescripcion()) {
    mensajeDescripcion = 'La descripción es obligatoria.\n';
  }

  return {
    mensajeMonto,
    mensajeFecha,
    mensajeDescripcion,
    ok: mensajeMonto.length === 0 && mensajeFecha.length === 0 && mensajeDescripcion.length === 0
  };
});

const cerrarModal = () => {
  emit('close');
};

const guardar = () => {
  emit('saved', gastoEditado.value);
  cerrarModal();
};

const puedeGuardar = () => {
  return !validacionForm.value.ok;
};

// Watch para sincronizar gasto
watch(() => props.gasto, (newGasto) => {
  if (newGasto) {
    gastoEditado.value = { 
      ...newGasto,
      fechaGasto: newGasto.fechaGasto ? new Date(newGasto.fechaGasto).toISOString().split('T')[0] : ''
     };
    formDirty.value = {
      monto: false,
      fechaGasto: false,
      descripcionGasto: false
    };
  }
}, { immediate: true });

</script>

<style scoped>

</style>