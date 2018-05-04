import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import Util from '@/libs/util';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    getters: {
        hasPermission: (state, getters) => tag => {
            if (localStorage.isAdmin === "1") {
                return true;
            }
            let optPermissions = state.user.optPermissions;
            if (!optPermissions || optPermissions.length == 0) {
                optPermissions = localStorage.optPermissions;
                state.user.optPermissions = optPermissions;
            }
            if (optPermissions && optPermissions.length > 0) {
                return Util.oneOf(tag, optPermissions);
            }
            return false;
        },
        hasMenuPermission: (state, getters) => tag => {
            if (localStorage.isAdmin === "1") {
                return true;
            }
            let menuPermissions = state.user.menuPermissions;
            if (!menuPermissions || menuPermissions.length == 0) {
                menuPermissions = localStorage.menuPermissions;
                state.user.menuPermissions = menuPermissions;
            }
            if (menuPermissions && menuPermissions.length > 0) {
                return Util.oneOf(tag, menuPermissions);
            }
            return false;
        }
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user
    }
});

export default store;
