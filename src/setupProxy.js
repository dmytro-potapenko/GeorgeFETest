/* eslint-disable */

const { createProxyMiddleware } = require('http-proxy-middleware');

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

module.exports = function (app) {
    app.use(
        ['/api'],
        createProxyMiddleware({
            target: apiBaseUrl,
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/api': '/',
            },
        })
    );
};
