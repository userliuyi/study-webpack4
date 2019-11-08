import Vue from 'vue';
import App from './views/app.vue';
import router from './router/router.js';
import store from './store/global.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/index.css';
import './css/common.scss';
import 'utils/filters';
import axios from 'utils/http.js';

Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
