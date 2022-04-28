import { createStore } from 'vuex';
import axiosClient from '../axios';

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

const store = createStore({
    state: {
        user: {
            data: {},
            // Se recupera el token de autenticación para evitar
            // loggearse/registrarse de nuevo
            token: sessionStorage.getItem('TOKEN'),
        },
        currentSurvey: {
            loading: false,
            data: {},
        },
        surveys: [...tmpSurveys],
        questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    },
    getters: {},
    actions: {
        async getSurvey({ commit }, id) {
            commit('setCurrentSurveyLoading', true);
            return axiosClient
                .get(`/survey/${id}`)
                .then((res) => {
                    commit('setCurrentSurvey', res.data);
                    commit('setCurrentSurveyLoading', false);
                    return res;
                })
                .catch((err) => {
                    commit('setCurrentSurveyLoading', false);
                    throw err;
                });
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url;
            let response;
            if (survey.id) {
                // Si existe un id, se actualiza la survey
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit('setCurrentSurvey', res.data);
                        return res;
                    });
            } else {
                // Si no, se crea una nueva
                response = axiosClient.post('/survey', survey).then((res) => {
                    commit('setCurrentSurvey', res.data);
                    return res;
                });
            }
            return response;
        },
        async register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                });
        },
        async login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                });
        },
        async logout({ commit }) {
            return axiosClient.post('/logout')
                .then((response) => {
                    commit('logout');
                    return response;
                });
        },

    },
    mutations: {
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            // El token se retorna desde el controlador Auth de laravel
            state.user.token = userData.token;
            // Al igual que la data
            state.user.data = userData.user;
            // Se guarda la sesión para seguir navegando aun si se recarga la página
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}
});

export default store;