module.exports = {
  lintOnSave: true,
  devServer: {
    open: true,
    watchOptions: {
      poll: true,
    },
    // Configure proxy, more: https://github.com/chimurai/http-proxy-middleware#http-proxy-options
    // proxy: "http://89.108.102.170/",
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/api": {
        target: "http://89.108.102.170",
        ws: true,
        changeOrigin: true,
      },
    },
  },

  css: {
    loaderOptions: {
      scss: {
        // prependData: "@import '~@/assets/scss/base/_vars';",
        prependData: "@import '~@/assets/scss/main';",
      },
    },
  },
};
