module.exports = {
  lintOnSave: true,
  devServer: {
    open: true,
    watchOptions: {
      poll: true,
    },
    // Configure proxy, more: https://github.com/chimurai/http-proxy-middleware#http-proxy-options
    // proxy: "http://89.108.102.170/",
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/base/_vars";',
      },
    },
  },
};
