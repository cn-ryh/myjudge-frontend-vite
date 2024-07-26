import * as VueRouter from 'vue-router';
const routes = [
    { path: '/setting', component: ()=>import(`./userSettimg.vue`) },
    { path: '/:id', component: ()=>import(`./user-detail.vue`) },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`user`),
    routes,
});

export { router };
