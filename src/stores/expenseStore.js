import { defineStore } from "pinia";    
import { GastosService } from "../services/gastos.service";

export const useExpenseStore = defineStore("expenses", {    
    state: () => ({
        expensesList: []        // array para almacenar los gastos
    }),

    actions: {
        async loadExpenses() {                          // carga los gastos desde el servicio
            const service = new GastosService();        // instancia del servicio
            const data = await service.getGastos();     // obtiene los gastos
            if (data) this.expensesList = data;         // actualiza el estado con los gastos obtenidos
        },

        async addExpense(expense) {                  // agrega un nuevo gasto   
            const service = new GastosService();        
            const newExpense = await service.createGasto(expense);  
            if (newExpense) this.expensesList.push(newExpense);     // actualiza el estado con el nuevo gasto
        }
    }
});