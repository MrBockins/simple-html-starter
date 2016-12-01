var path = require("path");
var webpack = require("webpack");

module.exports = {
	cache: true,
  watch: false,
  devtool: 'source-map',
  entry: {
    app: "./app/scripts/app.js",
  },
  output: {
    path: path.join(__dirname, "dist/js/"),
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-ie']
        }
      }
    ]
  }
};