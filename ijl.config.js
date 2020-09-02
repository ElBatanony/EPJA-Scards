const pkg = require("./package.json");

let pkgName = pkg.name.replace('uds-', '')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    mode: 'development',
    output: {
      publicPath: `/static/${pkgName}/${pkg.version}/`
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        { parser: { system: false } },
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
        },
        {
          test: /\.(jpe?g|gif|png|svg|woff|ttf|eot|wav|mp3)$/,
          loader: "file-loader"
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [

      new VueLoaderPlugin()
    ]
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
