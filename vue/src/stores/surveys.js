import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'


const csrf = () => axios.get('/sanctum/csrf-cookie')

const tmpSurveys = [
    {
        id: 100,
        title: "La mejor clase de la semana",
        slug: "la-mejor-clase-de-la-semana",
        status: "draft",
        image:
            "https://www.gerentes360.com/archivos/un-emprendedor/wp-content/uploads/2015/10/clase.jpg",
        description: "Cual es la MEJOR<br>CLASE<br>DE<br>LA<br>SEMANA",
        created_at: "2022-04-22 00:00:00",
        updated_at: "2022-04-22 00:00:00",
        expire_date: "2022-04-29 00:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "¿Cuál es tu carrera?",
                description: null,
                data: {
                    options: [
                        { uuid: "1a24933c-bff7-4d4f-9127-8e7af00a483c", text: "INCO" },
                        { uuid: "dcbd3489-7b65-41a1-ba45-d8c22da89b2d", text: "INNI" },
                        { uuid: "562de769-7d1c-491b-b555-1c0c20c1d68e", text: "QFB" },
                        { uuid: "4f95eb5c-4cbb-4645-91d5-0a65968408cb", text: "CIV" },
                    ],
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "¿Tienes una clase favorita?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit est ut vehicula accumsan. Vestibulum rutrum magna vel molestie imperdiet. Nullam dui libero, feugiat congue feugiat eget, ornare eu massa. Fusce aliquet lectus felis, in efficitur est ullamcorper at. Donec a tortor id justo elementum vehicula sed sit amet turpis. Aliquam sit amet mattis nunc. Suspendisse sed ligula orci. Vivamus tempus suscipit arcu at rhoncus. Pellentesque porta at metus at sollicitudin.",
                data: {
                    options: [
                        { uuid: "d64100a0-61f5-4ba8-a910-e753c7894b4f", text: "Sí" },
                        { uuid: "5b1c58cc-0d05-49dc-929d-430c6701b04e", text: "No" },
                    ],
                },
            }
        ],
    },
];


export const useSurveys = defineStore('surveys', {
    state: () => ({
        currentSurvey: {
            loading: false,
            data: {},
        },
        surveys: [...tmpSurveys],
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
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSurveys, import.meta.hot))
}
