const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
// vue.config.js
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      // 配置解析别名
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        api: path.resolve(__dirname, "../src/api")
      }
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ["console.log"] // 移除console
            }
          }
        })
      ]
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: ["./src/styles/mixins/util.scss"]
        })
        .end();
    });
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === "development", config =>
        config.devtool("cheap-source-map")
      );
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = false;
        return options;
      });
  }
};
