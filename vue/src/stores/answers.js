import axios from '../lib/axios';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useAnswers = defineStore('answers', {
    state: () => {
        return {
            loading: false,
            data: [],
        }
    },
    getters: {},
    actions: {
        async getAnswers(id) {
            this.loading = true;
            return axios.get(`/api/answers/${id}`)
                .then((res) => {
                    console.log();
                    this.loading = false;
                    this.data = res.data;
                    return res;
                })
                .catch((err) => {
                    this.loading = false;
                    throw err;
                })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAnswers, import.meta.hot));
}
