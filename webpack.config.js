var path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    sw: "./src/lib/service-worker.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },

  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true
  }
};
