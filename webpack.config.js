const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = [
  {
    mode: "development",
    entry: "./scuttlefish/electron.ts",
    target: "electron-main",
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, "scuttlefish"),
          use: [{ loader: "ts-loader" }]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "electron.js"
    }
  },
  {
    mode: "development",
    target: "electron-renderer",
    devtool: "source-map",
    entry: "./scuttlefish/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "scuttlefish"),
          use: [{ loader: "ts-loader" }]
        }
      ]
    },
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./scuttlefish/index.html"
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    }
  }
]
