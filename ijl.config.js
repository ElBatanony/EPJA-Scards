const pkg = require("./package.json");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name.replace('uds-', '')}/${pkg.version}/`
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  config: {
    'main.api.base.url': '/api',
  },
  apps: {
    boilerplateApp: { name: 'main', version: pkg.version }
  },
  features: {
    feature1: true,
    feature2: false,
  },
  navigations: {
    main: "/main",
    news: "/news",
    ya: "https://yandex.ru"
  }
};
