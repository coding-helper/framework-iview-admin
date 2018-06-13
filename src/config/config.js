let config = {
    http: {
        baseUrl: '/api',
        timeout: 30000,
        skipLogin: false,
        loginUrl: '/user/user/login',
        skipLogout: true,
        logoutUrl: '/system/logout',
    },
}
module.exports = config;
