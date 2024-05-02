import * as VueRouter from 'vue-router';
import userSettimg from './userSettimg.vue';
import userDetail from './user-detail.vue';

const routes = [
    { path: '/setting', component: userSettimg },
    { path: '/:id', component: userDetail },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`user`),
    routes,
});

export { router };
