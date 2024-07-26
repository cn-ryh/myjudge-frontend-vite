
import * as VueRouter from 'vue-router';

const routes = [
    // 主页
    { path: '/', component: () => import(`./admin-home.vue`) },
    // 新建题目
    { path: '/newproblem', component: () => import(`./problem-new.vue`) },
    // 
    { path: '/problem/:pid', component: ()=> import(`./problem-admin.vue`) },
    { path: '/userAdmin', component: ()=> import(`./user-admin.vue`) },
    { path: '/newtraining', component: ()=>import(`./training-new.vue`) },
    { path: '/training/:id', component: ()=> import(`./training-admin.vue`) },
    { path: '/contest/:id', component: ()=> import(`./contest-admin.vue`) },
    { path: '/newcontest', component: ()=> import(`./contest-new.vue`) },
    { path: '/:pathMatch(.*)*', component: ()=> import(`./admin-home.vue`) },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(`admin`),
    routes,
});

export { router };
