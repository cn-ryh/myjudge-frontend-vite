
import * as VueRouter from 'vue-router';
import NetcutList from './netcut-list.vue';
import NetcutView from './netcut-view.vue';


const routes = [
    { path: '/mine', component: NetcutList },
    { path: '/:pid', component: NetcutView }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`netcut`),
    routes,

});
export { router };