const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    // proxy('http://localhost:2000')

    createProxyMiddleware("/api", {
      target: `http://localhost:${process.env.PORT}/api`,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
