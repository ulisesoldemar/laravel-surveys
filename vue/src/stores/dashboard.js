import axios from '../lib/axios';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useDashboard = defineStore('dashboard', {
    state: () => {
        return {
            loading: false,
            data: {},
        }
    },
    getters: {},
    actions: {
        async getDashboardData() {
            this.loading = true;
            return axios.get(`/api/dashboard`)
                .then((res) => {
                    this.loading = false;
                    this.data = res.data;
                    return res;
                })
                .catch((err) => {
                    this.loading = false;
                    return err;
                })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDashboard, import.meta.hot));
}
