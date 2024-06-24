
import * as VueRouter from 'vue-router';
import detail from './training-detail.vue';
import list from './training-list.vue';


const routes = [
    { path: '/:id', component: detail },
    { path: '/list', component: list }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`training`),
    routes, 
});

export { router };
