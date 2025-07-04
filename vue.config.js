const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/Riya-Fashion/',
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = "Riya Fashion",
      args[0].base = '/Riya-Fashion/'
      return args
    })
  }
})