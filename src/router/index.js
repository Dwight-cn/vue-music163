import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';


Vue.use(Router);

// 路由懒加载
const HelloWorld = () => import('@/components/HelloWorld');
const Search = () => import('@/components/Search/Search');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hello',
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
  ],
});
