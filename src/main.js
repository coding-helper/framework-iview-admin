import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter, loginRouter, page500} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import Cookies from 'js-cookie';

Vue.use(VueI18n);
Vue.use(iView);

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
        
        util.ajax.interceptors.request.use(
            config => {
                config.headers.token = Cookies.get('token');
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        util.ajax.interceptors.response.use(
            res => {
                return res;
            },
            err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            Cookies.remove('user');
                            Cookies.remove('token');
                            this.router.replace(loginRouter);
                        default:
                            this.router.replace(page500);
                    }
                }
                return Promise.reject(err);
            }
        );
    }
});
