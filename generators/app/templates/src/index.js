/**
 * 创建人：李智勇
 * 创建时间： 2017/5/9.
 * 描述：index页面入口js文件，配置路由
 */
import  './lib/neat.css';
import  './index.scss';
import  './common/js/initRem';
// import home from './container/home/home';

const routes = [
    // { name: 'solutionDisplay', path: '/solution/solutionDisplay/:id', component: solutionDisplay }
];

const router = new VueRouter({
    routes
});
const app = new Vue({
    router
}).$mount('#app');
