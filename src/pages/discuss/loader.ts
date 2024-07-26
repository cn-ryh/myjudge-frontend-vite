
import * as VueRouter from 'vue-router';



const routes = [
    { path: '/:id', component:  ()=> import(`./discuss-detail.vue`) },
    { path: '/list', component: () => import(`./discuss-list.vue`) },
    { path: '/new', component: () => import(`./discuss-new.vue`) }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`discuss`),
    routes, 
});

export { router };
