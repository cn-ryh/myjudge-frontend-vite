
import * as VueRouter from 'vue-router';
import RecordVue from './recordDetail.vue';
import RecordList from './recordList.vue';


const routes = [
    { path: '/:rid', component: RecordVue },
    { path: '/list', component: RecordList }
];


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`record`),
    routes, 
});

export { router };
