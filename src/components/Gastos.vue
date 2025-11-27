<template>
    <div>
        <Navbar></Navbar>
        <div class="container-fluid mt-4">
            <h2 class="mb-4">Listado de Gastos</h2>
            
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Gastos Registrados</h5>
                </div>
                <div class="card-body">
                    <div v-if="loading" class="text-center py-4">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                    
                    <DataTable 
                        v-else
                        :value="gastosFiltrados" 
                        :paginator="true" 
                        :rows="10"
                        :rowsPerPageOptions="[10, 20, 50]"
                        :sortMode="'multiple'"
                        stripedRows
                        showGridlines
                        responsiveLayout="scroll"
                        class="p-datatable-sm table-responsive"
                        :emptyMessage="'No hay gastos registrados'"
                    >
                        <template #header>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="p-input-icon-left w-100 me-3">
                                    <i class="pi pi-search" />
                                    <InputText 
                                        v-model="globalFilter" 
                                        placeholder="Buscar en todos los campos..." 
                                        class="w-100"
                                    />
                                </span>
                                <Button 
                                    icon="pi pi-refresh" 
                                    label="Actualizar" 
                                    @click="cargarGastos"
                                    class="p-button-outlined"
                                ></Button>
                                <Button 
                                    icon="pi pi-plus" 
                                    label="Agregar"
                                    @click="$router.push('/expenses')" 
                                    class="p-button-outlined mx-3 px-3"
                                ></Button>
                            </div>
                        </template>
                        
                        <Column field="id" header="ID" :sortable="true" style="min-width: 80px">
                            <template #body="{ data }">
                                {{ data.id }}
                            </template>
                        </Column>
                        
                        <Column field="descripcionGasto" header="Descripción" :sortable="true" style="min-width: 200px">
                            <template #body="{ data }">
                                {{ data.descripcionGasto || 'Sin descripción' }}
                            </template>
                        </Column>

                        <Column field="category" header="Categoría" :sortable="true" style="min-width: 200px">
                            <template #body="{ data }">
                                {{ data.category || 'Sin categoría' }}
                            </template>
                        </Column>
                        
                        <Column field="monto" header="Monto" :sortable="true" style="min-width: 120px">
                            <template #body="{ data }">
                                <span class="fw-bold text-primary">
                                    ${{ formatMonto(data.monto) }}
                                </span>
                            </template>
                        </Column>
                        
                        <Column field="metodoPago" header="Método de Pago" :sortable="true" style="min-width: 150px">
                            <template #body="{ data }">
                                <span class="badge bg-info text-dark">
                                    {{ data.metodoPago || 'Sin especificar' }}
                                </span>
                            </template>
                        </Column>
                        
                        <Column field="fechaGasto" header="Fecha" :sortable="true" style="min-width: 150px">
                            <template #body="{ data }">
                                {{ formatFecha(data.fechaGasto) }}
                            </template>
                        </Column>
                        <Column header="Acciones" style="min-width: 120px">
                            <template #body="{ data }">
                                <div class="d-flex gap-2">
                                    <Button icon="pi pi-pencil" size="small" severity="success" class="action-btn" @click="abrirModalEdicion(data.id)"></Button>
                                    <Button icon="pi pi-trash" size="small" severity="danger" class="action-btn" @click="eliminarGasto(data.id)"></Button>
                                </div>
                            </template>
                        </Column>
                        <ModalEdit :show="showModal" :gasto="gastoEditar" @close="cerrarModal" @saved="guardarGasto"></ModalEdit>
                    </DataTable>                    
                    <div v-if="!loading && gastos.length > 0" class="mt-3">
                        <p class="text-muted">
                            <strong>Total de registros:</strong> {{ mostrarTotalRegistros }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from './NavBar.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ModalEdit from './ModalEdit.vue';
import { useExpenseStore } from '../stores/expenseStore.js';

const gastos = ref([]);
const loading = ref(true);
const globalFilter = ref(null);
const gastoEditar = ref({});
const showModal = ref(false);

const store = useExpenseStore();

const gastosFiltrados = computed(() => {
    if (!globalFilter.value || globalFilter.value.trim() === '') {
        return gastos.value;
    }
    
    const filter = globalFilter.value.toLowerCase();
    return gastos.value.filter(gasto => {
        const descripcion = (gasto.descripcionGasto || '').toLowerCase();
        const metodoPago = (gasto.metodoPago || '').toLowerCase();
        const category = (gasto.category || '').toLowerCase();
        const monto = String(gasto.monto || '').toLowerCase();
        const fecha = formatFecha(gasto.fechaGasto).toLowerCase();
        const id = String(gasto.id || '').toLowerCase();
        
    return descripcion.includes(filter) ||
               metodoPago.includes(filter) ||
               monto.includes(filter) ||
               fecha.includes(filter) ||
               id.includes(filter) ||
               category.includes(filter);
    });
});

const mostrarTotalRegistros = computed(() => {
    return gastosFiltrados.value.length;
})

const formatMonto = (monto) => {
    const num = parseFloat(monto) || 0;
    return num.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

const formatFecha = (fecha) => {
  if (!fecha) return 'Sin fecha';
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
  }
  try {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return fecha;
  }
};

const cargarGastos = async () => {
    try {
        loading.value = true;
        await store.loadExpenses();
        gastos.value = store.getExpensesList;
        if(!gastos.value) {
            gastos.value = [];
        }
    } catch(error) {
        console.error('Error al cargar los gastos:', error);
        gastos.value = [];
    } finally {
        loading.value = false;
    }
};

const eliminarGasto = async (id) => {
    try {
        const confirmation = window.confirm(`¿Estás seguro de que deseas eliminar el gasto con el ID ${id}?`);
        if(confirmation) {
            await store.deleteExpense(id);
            await cargarGastos();
        }
    } catch(error) {
        console.error('Error al eliminar el gasto con ID:', id);
    }
}

const abrirModalEdicion = async(id) => {
    const buscarGasto = gastos.value.find(gasto => gasto.id === id);

    if(buscarGasto) {
        gastoEditar.value = {...buscarGasto};
        showModal.value = true;
    }
}

const guardarGasto = async(gastoEditado) => {
    try{
        await store.updateExpense(gastoEditado.id, gastoEditado);
        await cargarGastos();
    }catch(error) {
        console.error('Error al editar el gasto con ID:', gastoEditado.id);
    }
}

const cerrarModal = () => {
  showModal.value = false;
};

onMounted(() => {
    cargarGastos();
});
</script>

<style scoped>
:deep(.p-datatable) {
    font-size: 14px;
}

:deep(.p-datatable-header) {
    background: transparent;
    border: none;
    padding: 0;
}

:deep(.p-datatable-thead > tr > th) {
    background-color: #f8f9fa;
    color: #212529;
    font-weight: 600;
    border: 1px solid #dee2e6;
}

:deep(.p-datatable-tbody > tr > td) {
    border: 1px solid #dee2e6;
}

:deep(.p-datatable-tbody > tr:hover) {
    background-color: transparent !important;
}

:deep(.p-paginator) {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
}

:deep(.p-paginator .p-paginator-page.p-highlight),
:deep(.p-paginator .p-paginator-page-selected) {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: #212529 !important;
    font-weight: 700;
}

:deep(.p-paginator .p-paginator-page.p-highlight .p-paginator-page-link),
:deep(.p-paginator .p-paginator-page-selected) {
    color: #212529 !important;
}

:deep(.p-paginator .p-paginator-page-selected button),
:deep(.p-paginator .p-paginator-page-selected[type="button"]) {
    color: #212529 !important;
}

:deep(.p-inputtext) {
    width: 100%;
}

:deep(.action-btn) {
    font-size: 12px !important;
    padding: 0.25rem 0.5rem !important; 
    width: 32px !important; 
    height: 32px !important; 
    border-radius: 4px !important; 
}


.card {
    border-radius: 8px;
}

.card-header {
    border-radius: 8px 8px 0 0 !important;
}
</style>

