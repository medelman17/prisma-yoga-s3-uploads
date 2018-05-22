"use strict";
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const commonPaths = require("./common-paths");
const NodemonPlugin = require("nodemon-webpack-plugin");

const config = {
  mode: "development",
  target: "node",
  entry: path.resolve(commonPaths.projectRoot, "index.js"),
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(commonPaths.projectRoot, "local"),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  },
  devtool: "eval",
  plugins: [new Dotenv(), new NodemonPlugin()]
};

module.exports = config;
