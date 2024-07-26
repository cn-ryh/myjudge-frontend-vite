
import * as VueRouter from 'vue-router';

const routes = [
    { path: '/:rid', component: () => import(`./recordDetail.vue`) },
    { path: '/list', component: () => import(`./recordList.vue`) }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`record`),
    routes,
});

export { router };
