const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,
  publicPath: './',
  chainWebpack: (config) => {
    // 配置别名
    config.plugin('html').tap(args => {
      args[0].title = 'pdf分片加载' 
      return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('styles', resolve('src/styles'))
      .set('images', resolve('src/assets/images'))
    // 引入全局SCSS样式
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/styles/_variables.scss',
        })
        .end()
    })
  }
}