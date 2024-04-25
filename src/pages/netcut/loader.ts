// 1. 定义路由组件.
// 也可以从其他文件导入
import * as VueRouter from 'vue-router';
import NetcutList from './netcut-list.vue';
import NetcutView from './netcut-view.vue';


const routes = [
    { path: '/mine', component: NetcutList },
    { path: '/:pid', component: NetcutView }
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`netcut`),
    routes,

});
export { router };