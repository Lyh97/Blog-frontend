import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.use(Vueaxios, axios);
Vue.use(ElementUI);

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8888/' : 'http://localhost:8888/'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
