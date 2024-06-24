
import * as VueRouter from 'vue-router';

const routes = [
    { path: '/:id', component: ()=> import(`./contest-detail.vue`) },
    { path: '/list', component: ()=> import(`./contest-list.vue`) }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`contest`),
    routes, 
});

export { router };
