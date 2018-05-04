let config = {
    env: "development",
    dev: {
        host: '0.0.0.0',
        port: 8888,
        serviceUrl: 'http://localhost:8880',
        serviceRewritePath: '/v1',
    },
    prod: {
        serviceUrl: '',
    },
};
module.exports = config;
