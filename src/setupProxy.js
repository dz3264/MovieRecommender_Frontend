const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            //target: 'http://localhost:3300',
            target: 'http://52.60.58.196:3300',
            changeOrigin: true,
        })
    );
};