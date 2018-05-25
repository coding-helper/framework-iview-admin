let config = {
    env: 'development',
    name: 'Coding Helper framework iview admin',
    dev: {
        host: 'localhost',
        port: 8888,
        serviceUrl: 'http://localhost:8880',
        serviceRewritePath: '/v1',
    },
    prod: {
        publicPathUrl: 'http://localhost:8880/dist/'
    },
};
module.exports = config;
