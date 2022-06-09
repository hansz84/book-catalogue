const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://asia-southeast2-sejutacita-app.cloudfunctions.net",
      changeOrigin: true,
      pathRewrite: {
        "^/api/fee-assessment-categories": "/fee-assessment-categories",
      },
    })
  );
};
