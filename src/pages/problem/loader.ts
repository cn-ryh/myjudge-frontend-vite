
import * as VueRouter from 'vue-router';
import ProblemList from './problem-list.vue';
import ProblemView from './problem-view.vue';


const routes = [
    { path: '/list', component: ProblemList },
    { path: '/:pid', component: ProblemView }
];



const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`problem`),
    routes,

});
export { router };