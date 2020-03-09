const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

module.exports = {
  mode: "development",
  target: "electron-renderer",
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true
  },
  entry: "./scuttlefish/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, "scuttlefish"),
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 1 version" } }
                ],
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: ["react-hot-loader/babel"]
            }
          }
        ]
      }
    ]
  },
  output: {
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "scuttlefish", "index.html"),
      inject: false
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    },
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"]
  },
  stats: "minimal"
}
