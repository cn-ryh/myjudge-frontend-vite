// 1. 定义路由组件.
// 也可以从其他文件导入
import * as VueRouter from 'vue-router';
import ProblemList from './problem-list.vue';
import ProblemView from './problem-view.vue';
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。

const routes = [
    { path: '/list', component: ProblemList },
    { path: '/:pid', component: ProblemView }
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(`problem`),
    routes,

});
export { router };