"use strict";
const webpack = require("webpack");
const path = require("path");
const commonPaths = require("./common-paths");

const config = {
  mode: "production",
  entry: {
    app: [`${commonPaths.projectRoot}/index.js`]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(commonPaths.projectRoot, "dist"),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  },
  devtool: "nosources-source-map"
};

module.exports = config;