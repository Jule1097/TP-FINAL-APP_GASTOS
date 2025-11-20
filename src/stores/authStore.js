import { defineStore } from "pinia";    

export const useAuthStore = defineStore("auth", {
    state: () => ({
        userName:null,
        isAuthenticated: false,
    }),
    actions: {
        userLogin(userNameReceived) {
            this.userName = userNameReceived;
            this.isAuthenticated = true;
        },
        logout() {
            this.userName = null;
            this.isAuthenticated = false;
        },
    },
    getters: {
        getUserName: (state) => state.userName || '',
    },
    persist: {
        paths: ['userName', 'isAuthenticated']
    },
})