const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3300',
            //target: 'http://35.182.141.249:3300',
            changeOrigin: true,
        })
    );
};