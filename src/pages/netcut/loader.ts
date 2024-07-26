
import * as VueRouter from 'vue-router';

const routes = [
    { path: '/mine', component: ()=>import(`./netcut-list.vue`) },
    { path: '/:pid', component: ()=>import(`./netcut-view.vue`) }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`netcut`),
    routes,

});
export { router };