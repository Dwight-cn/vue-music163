import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 路由懒加载
const HelloWorld = () => import('@/components/HelloWorld');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
