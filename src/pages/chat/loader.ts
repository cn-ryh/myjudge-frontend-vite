
import * as VueRouter from 'vue-router';

const routes = [
    { path: `/`, component: ()=> import(`./chatList.vue`) },
    { path: `/list`, component: ()=> import(`./chatList.vue`) },
    { path: `/:id`, component: ()=> import(`./chatView.vue`) }
];



const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`chat`),
    routes,

});
export { router };