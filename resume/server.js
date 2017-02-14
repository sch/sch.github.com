var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var PORT = 3000;

config.devtool = "inline-source-map";

config.entry = [
  "react-hot-loader/patch",
  "webpack-dev-server/client?http://localhost:3000",
  "webpack/hot/only-dev-server",
  config.entry
];

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
];

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + PORT);
});
