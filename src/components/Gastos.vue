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
                        class="p-datatable-sm"
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
                                    @click="getAllGastos"
                                    class="p-button-outlined"
                                />
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
                    </DataTable>
                    
                    <div v-if="!loading && gastos.length > 0" class="mt-3">
                        <p class="text-muted">
                            <strong>Total de registros:</strong> {{ gastos.length }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import { GastosService } from '../services/gastos.service.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
    name: 'Gastos',
    components: {
        Navbar,
        DataTable,
        Column,
        InputText,
        Button
    },
    data() {
        return {
            gastosService: new GastosService(),
            gastos: [],
            loading: true,
            globalFilter: null
        };
    },
    computed: {
        gastosFiltrados() {
            if (!this.globalFilter || this.globalFilter.trim() === '') {
                return this.gastos;
            }
            
            const filter = this.globalFilter.toLowerCase();
            return this.gastos.filter(gasto => {
                const descripcion = (gasto.descripcionGasto || '').toLowerCase();
                const metodoPago = (gasto.metodoPago || '').toLowerCase();
                const monto = String(gasto.monto || '').toLowerCase();
                const fecha = this.formatFecha(gasto.fechaGasto).toLowerCase();
                const id = String(gasto.id || '').toLowerCase();
                
                return descripcion.includes(filter) ||
                       metodoPago.includes(filter) ||
                       monto.includes(filter) ||
                       fecha.includes(filter) ||
                       id.includes(filter);
            });
        }
    },
    methods: {
        async getAllGastos() {
            try {
                this.loading = true;
                this.gastos = await this.gastosService.getGastos();
                if (!this.gastos) {
                    this.gastos = [];
                }
            } catch (error) {
                console.error('Error cargando gastos:', error);
                this.gastos = [];
            } finally {
                this.loading = false;
            }
        },
        formatMonto(monto) {
            const num = parseFloat(monto) || 0;
            return num.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        },
        formatFecha(fecha) {
            if (!fecha) return 'Sin fecha';
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
        }
    },
    mounted() {
        this.getAllGastos();
    }
};
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

.card {
    border-radius: 8px;
}

.card-header {
    border-radius: 8px 8px 0 0 !important;
}
</style>

