module.exports = {
  mode: "development",
  watch: true,
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: __dirname + "/lib"
  },
  resolve: {
    extensions: [".ts", ".js", ".json",".scss"]
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
      { test: /\.tsx?$/, loader: "babel-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
};