import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';


Vue.use(Router);

// 路由懒加载
const HelloWorld = () => import('@/components/HelloWorld');
const Search = () => import('@/components/Search/Search');
const SearchResult = () => import('@/components/base/SearchResult/SearchResult');
const Singer = () => import('@/components/Singer/Singer');
const Album = () => import('@/components/Album/Album');
const Playlist = () => import('@/components/Playlist/Playlist');

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
      children: [
        {
          path: ':id',
          name: 'SearchResult',
          component: SearchResult,
        },
      ],
    },
    {
      path: '/singer/:id',
      name: 'Singer',
      component: Singer,
    },
    {
      path: '/album/:id',
      name: 'Album',
      component: Album,
    },
    {
      path: '/playlist/:id',
      name: 'Playlist',
      component: Playlist,
    },
  ],
});
