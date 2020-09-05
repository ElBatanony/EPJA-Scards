const pkg = require("./package.json");

let pkgName = pkg.name.replace('uds-', '')

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkgName}/${pkg.version}/`
    }
  },
  config: {
    'main.api.base.url': '/api',
  },
  apps: {
    scards: { name: pkgName, version: pkg.version }
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
