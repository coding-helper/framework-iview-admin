import Cookies from 'js-cookie';

const user = {
    state: {
        optPermissions: [],
        menuPermissions: [],
    },
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('token');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        setPermissions (state, permissions) {
            localStorage.isAdmin = permissions.isAdmin;
            if (permissions.isAdmin !== "1") {
                localStorage.menuPermissions = JSON.stringify(permissions.menuPermissions)
                state.menuPermissions = permissions.menuPermissions;
                localStorage.optPermissions = JSON.stringify(permissions.optPermissions)
                state.optPermissions = permissions.optPermissions;
            }
        },
    }
};

export default user;
