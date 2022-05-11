import axios from '@/lib/axios'
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
            links: [],
            data: [],
        },
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
        notification: {
            show: false,
            type: null,
            message: null,
        },
    }),
    getters: {},
    actions: {
        async getSurvey(id) {
            this.currentSurvey.loading = true
            return axios
                .get(`/api/survey/${id}`)
                .then(res => {
                    this.currentSurvey.data = res.data
                    this.currentSurvey.loading = false
                    return res
                })
                .catch(err => {
                    this.currentSurvey.loading = false
                    throw err
                })
        },
        async getSurveyBySlug(slug) {
            this.currentSurvey.loading = true
            return axios
                .get(`/api/survey-by-slug/${slug}`)
                .then((res) => {
                    this.currentSurvey = res.data
                    this.currentSurvey.loading = false
                    return res
                })
                .catch((err) => {
                    this.currentSurvey.loading = false
                    throw err
                })
        },
        async saveSurveyAnswer({ surveyId, answers }) {
            await csrf()
            return axios.post(`/api/survey/${surveyId}/answer`, { answers })
        },
        async saveSurvey(survey) {
            await csrf()
            delete survey.image_url
            let response
            if (survey.id) {
                // Si existe un id, se actualiza la survey
                response = axios
                    .put(`/api/survey/${survey.id}`, survey)
                    .then(res => {
                        this.currentSurvey.data = res.data
                        return res
                    })
            } else {
                // Si no, se crea una nueva
                response = axios.post('/api/survey', survey).then(res => {
                    this.currentSurvey.data = res.data
                    return res
                })
            }
            return response
        },
        async deleteSurvey(id) {
            return axios.delete(`/api/survey/${id}`)
        },
        async getSurveys({ url = null } = {}) {
            url = url || '/api/survey'
            this.surveys.loading = true
            return axios.get(url).then(res => {
                this.surveys.loading = false
                this.surveys.data = res.data.data
                this.surveys.links = res.data.meta.links
                return res
            })
        },
        notify({ message, type }) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000)
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSurveys, import.meta.hot))
}
