<template>
    <div>
        <Navbar></Navbar>
        <div class="container-fluid mt-4">
            <h2 class="mb-4">Dashboard de Gastos</h2>
            
            <!-- Cards de Resumen -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Total Gastos</h5>
                            <h3 class="text-primary">${{ totalGastos.toLocaleString('es-AR') }}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Promedio</h5>
                            <h3 class="text-info">${{ promedioGastos.toLocaleString('es-AR') }}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Cantidad de Registros</h5>
                            <h3 class="text-success">{{ totalRegistros }}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card text-center shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-muted">Gasto Máximo</h5>
                            <h3 class="text-danger">${{ gastoMaximo.toLocaleString('es-AR') }}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gráficos -->
            <div class="row mb-4">
                <!-- Gastos por Mes -->
                <div class="col-md-6 mb-4">
                    <div class="card shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0">Gastos por Mes</h5>
                        </div>
                        <div class="card-body">
                            <apexchart
                                v-if="chartOptionsGastosPorMes"
                                type="line"
                                height="300"
                                :options="chartOptionsGastosPorMes"
                                :series="seriesGastosPorMes"
                            ></apexchart>
                        </div>
                    </div>
                </div>

                <!-- Gastos por Método de Pago -->
                <div class="col-md-6 mb-4">
                    <div class="card shadow-sm">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0">Gastos por Método de Pago</h5>
                        </div>
                        <div class="card-body">
                            <apexchart
                                v-if="chartOptionsMetodoPago"
                                type="bar"
                                height="300"
                                :options="chartOptionsMetodoPago"
                                :series="seriesMetodoPago"
                            ></apexchart>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <!-- Gastos por Descripción/Categoría -->
                <div class="col-md-6 mb-4">
                    <div class="card shadow-sm">
                        <div class="card-header bg-info text-white">
                            <h5 class="mb-0">Gastos por Descripción</h5>
                        </div>
                        <div class="card-body">
                            <apexchart
                                v-if="chartOptionsDescripcion"
                                type="bar"
                                height="350"
                                :options="chartOptionsDescripcion"
                                :series="seriesDescripcion"
                            ></apexchart>
                        </div>
                    </div>
                </div>

                <!-- Top 10 Gastos -->
                <div class="col-md-6 mb-4">
                    <div class="card shadow-sm">
                        <div class="card-header bg-warning text-dark">
                            <h5 class="mb-0">Top 10 Gastos</h5>
                        </div>
                        <div class="card-body">
                            <apexchart
                                v-if="chartOptionsTopGastos"
                                type="bar"
                                height="350"
                                :options="chartOptionsTopGastos"
                                :series="seriesTopGastos"
                            ></apexchart>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabla de Resumen por Método de Pago -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-header bg-secondary text-white">
                            <h5 class="mb-0">Resumen por Método de Pago</h5>
                        </div>
                        <div class="card-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Método de Pago</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th>Promedio</th>
                                        <th>Porcentaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in resumenMetodoPago" :key="index">
                                        <td>{{ item.metodo }}</td>
                                        <td>{{ item.cantidad }}</td>
                                        <td>${{ item.total.toLocaleString('es-AR') }}</td>
                                        <td>${{ item.promedio.toLocaleString('es-AR') }}</td>
                                        <td>{{ item.porcentaje }}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="text-center mt-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import { GastosService } from '../services/gastos.service.js';
import VueApexCharts from 'vue3-apexcharts';

export default {
    name: 'Estadisticas',
    components: {
        Navbar,
        apexchart: VueApexCharts
    },
    data() {
        return {
            gastosService: new GastosService(),
            gastos: [],
            loading: true,
            totalGastos: 0,
            promedioGastos: 0,
            totalRegistros: 0,
            gastoMaximo: 0,
            chartOptionsGastosPorMes: null,
            seriesGastosPorMes: [],
            chartOptionsMetodoPago: null,
            seriesMetodoPago: [],
            chartOptionsDescripcion: null,
            seriesDescripcion: [],
            chartOptionsTopGastos: null,
            seriesTopGastos: [],
            topGastosDescripciones: [],
            resumenMetodoPago: []
        };
    },
    methods: {
        async getAllGastos() {
            try {
                this.loading = true;
                this.gastos = await this.gastosService.getGastos();
                if (this.gastos && this.gastos.length > 0) {
                    this.calcularEstadisticas();
                    this.generarGraficos();
                }
            } catch (error) {
                console.error('Error cargando gastos:', error);
            } finally {
                this.loading = false;
            }
        },
        calcularEstadisticas() {
            // Calcular totales
            this.totalGastos = this.gastos.reduce((sum, gasto) => {
                const monto = parseFloat(gasto.monto) || 0;
                return sum + monto;
            }, 0);

            this.totalRegistros = this.gastos.length;
            this.promedioGastos = this.totalRegistros > 0 ? this.totalGastos / this.totalRegistros : 0;
            
            this.gastoMaximo = Math.max(...this.gastos.map(g => parseFloat(g.monto) || 0));
        },
        generarGraficos() {
            this.generarGraficoGastosPorMes();
            this.generarGraficoMetodoPago();
            this.generarGraficoDescripcion();
            this.generarGraficoTopGastos();
            this.generarResumenMetodoPago();
        },
        generarGraficoGastosPorMes() {
            // Agrupar gastos por mes
            const gastosPorMes = {};
            
            this.gastos.forEach(gasto => {
                if (gasto.fechaGasto) {
                    const fecha = new Date(gasto.fechaGasto);
                    const mesAnio = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
                    const mesNombre = fecha.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
                    
                    if (!gastosPorMes[mesAnio]) {
                        gastosPorMes[mesAnio] = {
                            nombre: mesNombre,
                            total: 0
                        };
                    }
                    gastosPorMes[mesAnio].total += parseFloat(gasto.monto) || 0;
                }
            });

            const meses = Object.keys(gastosPorMes).sort();
            const nombresMeses = meses.map(m => gastosPorMes[m].nombre);
            const totales = meses.map(m => gastosPorMes[m].total);

            this.seriesGastosPorMes = [{
                name: 'Total Gastos',
                data: totales
            }];

            this.chartOptionsGastosPorMes = {
                chart: {
                    type: 'line',
                    toolbar: { 
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true
                        }
                    }
                },
                xaxis: {
                    categories: nombresMeses,
                    labels: {
                        rotate: -45,
                        style: {
                            fontSize: '12px',
                            colors: '#ffffff',
                            fontWeight: 700
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#ffffff',
                            fontWeight: 700
                        },
                        formatter: function (val) {
                            return '$' + val.toLocaleString('es-AR');
                        }
                    }
                },
                tooltip: {
                    theme: 'light',
                    style: {
                        fontSize: '14px',
                        color: '#212529'
                    },
                    y: {
                        formatter: function (val) {
                            return '$' + val.toLocaleString('es-AR');
                        }
                    }
                },
                legend: {
                    labels: {
                        colors: '#212529',
                        fontWeight: 600
                    }
                },
                colors: ['#0d6efd'],
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#212529'],
                        fontWeight: 600
                    },
                    formatter: function (val) {
                        return '$' + Math.round(val).toLocaleString('es-AR');
                    }
                }
            };
        },
        generarGraficoMetodoPago() {
            // Agrupar por método de pago
            const metodoPagoCount = {};
            const metodoPagoCantidad = {};
            
            this.gastos.forEach(gasto => {
                const metodo = gasto.metodoPago || 'Sin especificar';
                if (!metodoPagoCount[metodo]) {
                    metodoPagoCount[metodo] = 0;
                    metodoPagoCantidad[metodo] = 0;
                }
                metodoPagoCount[metodo] += parseFloat(gasto.monto) || 0;
                metodoPagoCantidad[metodo]++;
            });

            // Ordenar por total descendente
            const metodosOrdenados = Object.entries(metodoPagoCount)
                .sort((a, b) => b[1] - a[1])
                .map(([metodo]) => metodo);

            const totales = metodosOrdenados.map(m => metodoPagoCount[m]);
            const cantidades = metodosOrdenados.map(m => metodoPagoCantidad[m]);

            this.seriesMetodoPago = [{
                name: 'Total Gastos',
                data: totales
            }];

            // Paleta de colores para barras
            const coloresBarras = [
                '#198754', '#0dcaf0', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14',
                '#20c997', '#e83e8c', '#6610f2', '#0d6efd', '#ff6b6b', '#4ecdc4'
            ];

            this.chartOptionsMetodoPago = {
                chart: {
                    type: 'bar',
                    toolbar: { show: true },
                    horizontal: true
                },
                xaxis: {
                    categories: metodosOrdenados,
                    labels: {
                        style: {
                            colors: '#ffffff',
                            fontWeight: 700,
                            fontSize: '13px'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#ffffff',
                            fontWeight: 700
                        },
                        formatter: function (val) {
                            return '$' + val.toLocaleString('es-AR');
                        }
                    }
                },
                tooltip: {
                    custom: (opts) => {
                        const dataPointIndex = opts.dataPointIndex;
                        const metodo = metodosOrdenados[dataPointIndex];
                        const total = totales[dataPointIndex];
                        const cantidad = cantidades[dataPointIndex];
                        const promedio = cantidad > 0 ? total / cantidad : 0;
                        return '<div style="padding: 10px; background: #333; color: #fff; border-radius: 5px;">' +
                               '<strong>Método:</strong> ' + metodo + '<br/>' +
                               '<strong>Total:</strong> $' + Math.round(total).toLocaleString('es-AR') + '<br/>' +
                               '<strong>Cantidad:</strong> ' + cantidad + ' transacciones<br/>' +
                               '<strong>Promedio:</strong> $' + Math.round(promedio).toLocaleString('es-AR') +
                               '</div>';
                    }
                },
                legend: {
                    labels: {
                        colors: '#ffffff',
                        fontWeight: 700
                    }
                },
                colors: [coloresBarras[0]],
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#ffffff'],
                        fontWeight: 700,
                        fontSize: '12px'
                    },
                    formatter: function (val) {
                        return '$' + Math.round(val).toLocaleString('es-AR');
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 4,
                        dataLabels: {
                            position: 'right'
                        }
                    }
                }
            };
        },
        generarGraficoDescripcion() {
            // Agrupar por descripción
            const descripcionCount = {};
            
            this.gastos.forEach((gasto, index) => {
                // Acceder directamente al campo descripcionGasto
                let desc = gasto.descripcionGasto;
                
                // Si no existe, intentar variaciones
                if (desc === undefined || desc === null) {
                    desc = gasto.descriptionGasto || gasto.descripcion || gasto.description;
                }
                
                // Convertir a string y limpiar
                if (desc !== undefined && desc !== null) {
                    desc = String(desc).trim();
                } else {
                    desc = '';
                }
                
                // Si está vacío después de limpiar, usar "Sin descripción"
                const descFinal = desc !== '' ? desc : 'Sin descripción';
                
                if (!descripcionCount[descFinal]) {
                    descripcionCount[descFinal] = 0;
                }
                descripcionCount[descFinal] += parseFloat(gasto.monto) || 0;
            });
            
            // Ordenar y tomar top 10
            const sorted = Object.entries(descripcionCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);

            const descripciones = sorted.map(([desc]) => desc.length > 20 ? desc.substring(0, 20) + '...' : desc);
            const totales = sorted.map(([, total]) => total);

            this.seriesDescripcion = [{
                name: 'Total',
                data: totales
            }];

            this.chartOptionsDescripcion = {
                chart: {
                    type: 'bar',
                    toolbar: { show: true },
                    horizontal: true
                },
                xaxis: {
                    categories: descripciones,
                    labels: {
                        style: {
                            fontSize: '11px',
                            colors: '#ffffff',
                            fontWeight: 700
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#ffffff',
                            fontWeight: 700
                        },
                        formatter: function (val) {
                            return '$' + val.toLocaleString('es-AR');
                        }
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return '$' + val.toLocaleString('es-AR');
                        }
                    }
                },
                legend: {
                    labels: {
                        colors: '#212529',
                        fontWeight: 600
                    }
                },
                colors: ['#0dcaf0'],
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#212529'],
                        fontWeight: 600
                    },
                    formatter: function (val) {
                        return '$' + Math.round(val).toLocaleString('es-AR');
                    }
                }
            };
        },
        generarGraficoTopGastos() {
            // Top 10 gastos individuales
            const gastosOrdenados = [...this.gastos]
                .map(g => {
                    // Obtener descripción usando el mismo método que en generarGraficoDescripcion
                    let desc = g.descripcionGasto;
                    if (desc === undefined || desc === null) {
                        desc = g.descriptionGasto || g.descripcion || g.description;
                    }
                    if (desc !== undefined && desc !== null) {
                        desc = String(desc).trim();
                    } else {
                        desc = '';
                    }
                    const descFinal = desc !== '' ? desc : 'Sin descripción';
                    
                    return {
                        descripcion: descFinal,
                        descripcionCompleta: descFinal,
                        monto: parseFloat(g.monto) || 0
                    };
                })
                .sort((a, b) => b.monto - a.monto)
                .slice(0, 10);

            // Para el eje X, truncar si es muy largo pero mantener más caracteres
            const descripciones = gastosOrdenados.map(g => {
                const desc = g.descripcion;
                return desc.length > 40 ? desc.substring(0, 40) + '...' : desc;
            });
            const montos = gastosOrdenados.map(g => g.monto);
            
            // Guardar descripciones completas para el tooltip
            const descripcionesCompletas = gastosOrdenados.map(g => g.descripcionCompleta);

            this.seriesTopGastos = [{
                name: 'Monto',
                data: montos
            }];

            // Guardar las descripciones completas en el componente para acceso en tooltip
            this.topGastosDescripciones = descripcionesCompletas;

            this.chartOptionsTopGastos = {
                chart: {
                    type: 'bar',
                    toolbar: { show: true }
                },
                xaxis: {
                    categories: descripciones,
                    labels: {
                        rotate: -45,
                        style: {
                            fontSize: '12px',
                            colors: '#ffffff',
                            fontWeight: 700
                        },
                        maxHeight: 120
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#ffffff',
                            fontWeight: 700
                        },
                        formatter: function (val) {
                            return '$' + val.toLocaleString('es-AR');
                        }
                    }
                },
                tooltip: {
                    custom: (opts) => {
                        const dataPointIndex = opts.dataPointIndex;
                        const descripcion = this.topGastosDescripciones[dataPointIndex] || 'Sin descripción';
                        const monto = opts.series[opts.seriesIndex][dataPointIndex];
                        return '<div style="padding: 10px; background: #333; color: #fff; border-radius: 5px;">' +
                               '<strong>Descripción:</strong> ' + descripcion + '<br/>' +
                               '<strong>Monto:</strong> $' + Math.round(monto).toLocaleString('es-AR') +
                               '</div>';
                    }
                },
                legend: {
                    labels: {
                        colors: '#ffffff',
                        fontWeight: 700
                    }
                },
                colors: ['#ffc107'],
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#ffffff'],
                        fontWeight: 700,
                        fontSize: '12px'
                    },
                    formatter: function (val) {
                        return '$' + Math.round(val).toLocaleString('es-AR');
                    }
                }
            };
        },
        generarResumenMetodoPago() {
            const resumen = {};
            
            this.gastos.forEach(gasto => {
                const metodo = gasto.metodoPago || 'Sin especificar';
                if (!resumen[metodo]) {
                    resumen[metodo] = {
                        metodo: metodo,
                        cantidad: 0,
                        total: 0
                    };
                }
                resumen[metodo].cantidad++;
                resumen[metodo].total += parseFloat(gasto.monto) || 0;
            });

            this.resumenMetodoPago = Object.values(resumen)
                .map(item => ({
                    ...item,
                    promedio: item.cantidad > 0 ? item.total / item.cantidad : 0,
                    porcentaje: this.totalGastos > 0 ? (item.total / this.totalGastos * 100) : 0
                }))
                .sort((a, b) => b.total - a.total)
                .map(item => ({
                    ...item,
                    porcentaje: item.porcentaje.toFixed(2)
                }));
        }
    },
    mounted() {
        this.getAllGastos();
    }
};
</script>

<style scoped>
.card {
    border-radius: 8px;
}

.card-header {
    border-radius: 8px 8px 0 0 !important;
}

.shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

/* Estilos para el toolbar de ApexCharts - texto negro */
:deep(.apexcharts-toolbar) {
    color: #212529 !important;
}

:deep(.apexcharts-menu-icon),
:deep(.apexcharts-zoom-icon),
:deep(.apexcharts-zoomin-icon),
:deep(.apexcharts-zoomout-icon),
:deep(.apexcharts-pan-icon),
:deep(.apexcharts-reset-icon),
:deep(.apexcharts-download-icon),
:deep(.apexcharts-selection-icon) {
    fill: #212529 !important;
    color: #212529 !important;
}

:deep(.apexcharts-menu) {
    background-color: #fff !important;
    border: 1px solid #ddd !important;
}

:deep(.apexcharts-menu-item) {
    color: #212529 !important;
}

:deep(.apexcharts-menu-item:hover) {
    background-color: #f0f0f0 !important;
    color: #212529 !important;
}

/* Estilos para tooltips - texto negro */
:deep(.apexcharts-tooltip) {
    color: #212529 !important;
    background-color: #fff !important;
    border: 1px solid #ddd !important;
}

:deep(.apexcharts-tooltip-title) {
    color: #212529 !important;
    background-color: #f8f9fa !important;
    border-bottom: 1px solid #ddd !important;
}

:deep(.apexcharts-tooltip-series-group) {
    color: #212529 !important;
}

:deep(.apexcharts-tooltip-text) {
    color: #212529 !important;
}

:deep(.apexcharts-tooltip-text-label),
:deep(.apexcharts-tooltip-text-value) {
    color: #212529 !important;
}
</style>
