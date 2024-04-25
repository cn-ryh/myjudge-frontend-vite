import * as VueRouter from 'vue-router';
import training from './user-detail.vue';

const routes = [
    { path: '/:id', component: training },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`user`),
    routes,
});

export { router };
