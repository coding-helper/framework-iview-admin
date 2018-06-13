import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter, page401, page500} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import Cookies from 'js-cookie';
import axios from 'axios';
import VueAxios from 'vue-axios';
import config from './config/config';

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(VueAxios, axios);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);

        this.$http.defaults.baseURL = config.http.baseUrl;
        this.$http.defaults.timeout = config.http.timeout;
        this.$http.interceptors.request.use(
            config => {
                config.headers.token = Cookies.get('token');
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        this.$http.interceptors.response.use(
            res => {
                if (res.headers.token) {
                    Cookies.set('token', res.headers.token);
                }
                return res;
            },
            err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            this.$router.replace(page401);
                            Cookies.remove('user');
                            Cookies.remove('token');
                            break;
                        default:
                            this.$router.replace(page500);
                    }
                }
                return Promise.reject(err);
            }
        );
    }
});
