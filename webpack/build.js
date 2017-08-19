const webpack = require('webpack');
const webpackMerge = require("webpack-merge");
const path = require('path');


const plugins = []

if (process.env.NODE_ENV === 'production'){
  // uglify unfortunately does not support es6 just yet 
  // so having issues with transpiling the code
  // in the interest of time, this is not a high priority task to configure
  
  // plugins.push(
  //   new webpack.optimize.UglifyJsPlugin({
  //     beautify: false,
  //     mangle: {
  //       screw_ie8: true,
  //       keep_fnames: true
  //     },
  //     compress: {
  //         screw_ie8: true
  //     },
  //     comments: false
  //   })
  // )
}

module.exports = webpackMerge(require("./common.js"), {
  output: {
    path: path.resolve(__dirname, "..", "client", "dist"),
    filename: "[name].bundle.js"
  },

  plugins,

  stats: {
    warnings: process.env.NODE_ENV === 'production' ? false : true
  }
});