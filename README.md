# Intrduction
- Base on iview-admin 1.3.1

# Install
```shell
npm install
```

# Run
- run in dev mode
```shell
npm run dev
```

# Build
- build and release
``` shell
npm run build
```

# Config
## Build Config
- /build/config.js
```js
let config = {
    env: 'development',
    name: 'Coding Helper framework iview admin',
    dev: { // use webpack proxy for dev mode
        host: 'localhost', //binding host
        port: 8888,  
        serviceUrl: 'http://localhost:8880', // service end url for every http request
        serviceRewritePath: '/v1', // rewrite path, see devpack proxy rewrite path config
    },
    prod: { // use nginx proxy
        publicPathUrl: 'http://localhost:8880/dist/'
    },
};
```
## App Config
- /src/config/config.js
```js
let config = {
  skipLogin: true,  // skip login, ignored if skipLogin set true
  loginUrl: '/system/login', //login url, use username and password
  skipLogout: true, // skip logout
  logoutUrl: '/system/logout', // logout url, ignored if skipLogout set true
}
```
