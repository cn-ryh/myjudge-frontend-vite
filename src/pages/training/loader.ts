
import * as VueRouter from 'vue-router';

const routes = [
    { path: '/:id', component: ()=> import(`./training-detail.vue`) },
    { path: '/list', component: ()=> import(`./training-list.vue`) }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`training`),
    routes, 
});

export { router };
