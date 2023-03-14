/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

const currenciesApiBaseUrl = process.env.REACT_APP_CURRENCIES_API_BASE_URL ?? '';
const countriesApiBaseUrl = process.env.REACT_APP_COUNTRIES_API_BASE_URL ?? '';

module.exports = function (app) {
    app.use(
        ['/currencies'],
        createProxyMiddleware({
            target: currenciesApiBaseUrl,
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/currencies': '/',
            },
        })
    );
    app.use(
        ['/countries'],
        createProxyMiddleware({
            target: countriesApiBaseUrl,
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/countries': '/',
            },
        })
    );
};
