import axios from 'axios';

export class GastosService {
    #url = '';
    constructor() {
        this.#url = 'https://69190be29ccba073ee92089d.mockapi.io/api/gastos';
    }

    getGastos = async () => {
        try {
            const gastos = await axios.get(this.#url);
            return gastos.data;
        } catch (error) {
            console.error('Error trayendo los gastos:', error);
            return null;
        }
    };

    createGasto = async (gasto) => {
        try {
            const res = await axios.post(this.#url, gasto);
            return res.data;
        } catch (error) {
            console.error("Error creando gasto:", error);
            return null;
        }
    }

    updateGasto = async (id, gasto) => {
        try {
            const res = await axios.put(`${this.#url}/${id}`, gasto);
            return res.data;
        } catch (error) {
            console.log(id, gasto)
            console.error("Error actualizando gasto:", error);
        }
    };

    deleteGasto = async (id) => {
        try {
            const res = await axios.delete(`${this.#url}/${id}`);
            return res.data;
        } catch (error) {
            console.error("Error eliminando gasto:", error);
        }
    };

}