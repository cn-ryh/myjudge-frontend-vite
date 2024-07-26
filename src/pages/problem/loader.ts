
import * as VueRouter from 'vue-router';

const routes = [
    { path: '/list', component: ()=> import(`./problem-list.vue`) },
    { path: '/:pid', component: () => import(`./problem-view.vue`) }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`problem`),
    routes,
});
export { router };