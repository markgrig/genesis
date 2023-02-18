const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
        '/V1': {
            target: 'https://test.gnzs.ru',
            changeOrigin: true,
            pathRewrite: {
                '^/V1': ''
            }
        },
        '/V2': {
            target: 'https://d6757be6f1100.amocrm.ru',
            changeOrigin: true,
            pathRewrite: {
                '^/V2': ''
            }
        },
    },
  }
})


