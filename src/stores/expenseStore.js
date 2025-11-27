import { defineStore } from "pinia";    
import { GastosService } from "../services/gastos.service";

export const useExpenseStore = defineStore("expenses", {    
    state: () => ({
        expensesList: []      
    }),

    actions: {
        async loadExpenses() {                          
            const service = new GastosService();        
            const data = await service.getGastos();     
            if (data) this.expensesList = data;        
        },

        async addExpense(expense) {                    
            const service = new GastosService();        
            const newExpense = await service.createGasto(expense);  
            if (newExpense) this.expensesList.push(newExpense);     
        },

        async deleteExpense(id) {
            const service = new GastosService();
            const deletedExpense = await service.deleteGasto(id);

            if (deletedExpense) {
                this.expensesList = this.expensesList.filter((expense) => expense.id !== id);
            }
        }
    },
    getters: {
        getExpensesList: (state) => state.expensesList || [],
    }
});
