// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import attachFastClick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// 消除 click 移动浏览器300ms延迟
attachFastClick.attach(document.body);

// 图片懒加载
Vue.use(VueLazyload);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
