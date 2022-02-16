module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Jack Givens';
      return args;
    });
    const imgRule = config.module.rule('images');
    imgRule.uses.clear();
    imgRule
      .test(/\.(png|jpe?g)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .options({ name: 'img/[name].[hash:8].webp' })
      .end()
      .use('webp-loader')
      .loader('webp-loader')
      .end();
  }
};
