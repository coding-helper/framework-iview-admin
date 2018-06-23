let config = {
    http: {
        baseUrl: '/api',
        timeout: 30000,
        skipLogin: true,
        loginUrl: '/system/login',
        skipLogout: true,
        logoutUrl: '/system/logout',
    },
}
module.exports = config;
