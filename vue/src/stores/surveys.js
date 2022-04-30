import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'


const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useSurveys = defineStore('surveys', {
    state: () => ({
        currentSurvey: {
            loading: false,
            data: {},
        },
        surveys: {
            loading: false,
            data: []
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    }),

    getters: {},
    actions: {
        async getSurvey(id) {
            this.currentSurvey.loading = true;
            return axios
                .get(`/api/survey/${id}`)
                .then((res) => {
                    this.currentSurvey.data = res.data;
                    this.currentSurvey.loading = false;
                    return res;
                })
                .catch((err) => {
                    this.currentSurvey.loading = false;
                    throw err;
                });
        },
        async saveSurvey(survey) {
            await csrf()
            delete survey.image_url;
            let response;
            if (survey.id) {
                // Si existe un id, se actualiza la survey
                response = axios
                    .put(`/api/survey/${survey.id}`, survey)
                    .then((res) => {
                        this.currentSurvey.data = res.data;
                        return res;
                    });
            } else {
                // Si no, se crea una nueva
                response = axios.post('/api/survey', survey).then((res) => {
                    this.currentSurvey.data = res.data;
                    return res;
                });
            }
            return response;
        },
        async deleteSurvey(id) {
            return axios.delete(`/api/survey/${id}`);
        },
        async getSurveys() {
            this.surveys.loading = true;
            return axios
                .get('/api/survey')
                .then((res) => {
                    this.surveys.loading = false;
                    this.surveys.data = res.data.data;
                    return res;
                });
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSurveys, import.meta.hot))
}
