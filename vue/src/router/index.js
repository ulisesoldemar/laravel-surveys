import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import store from "../store";
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Surveys from '../views/Surveys.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/surveys', name: 'Surveys', component: Surveys },
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        meta: { isGuest: true },
        component: AuthLayout,
        children: [
            { path: '/login', name: 'Login', component: Login },
            { path: '/register', name: 'Register', component: Register },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// beforeEach: Agrega una navigation guard que se ejecuta antes de cualquier navegación. 
// Retorna una función que remueve la guard registrada.
// to: ruta a la que se quiere ir
// from: ruta de la que se viene
// next: siguiente paso a ejecutar
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' });
    } else if (store.state.user.token && to.meta.isGuest) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
});

export default router;
