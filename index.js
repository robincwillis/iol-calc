var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const WEBPACK_PORT = 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(WEBPACK_PORT, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  } else {
		console.log('Listening at localhost:'+WEBPACK_PORT);
  }
});