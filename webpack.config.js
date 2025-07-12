const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/stimulus-entry.ts',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: [
            /node_modules/, 
            /__tests__/,
            /src\/core\/ZeroPoint\.ts$/,
            /src\/core\/NetworkNode\.ts$/,
            /src\/core\/BrowserNetworkNode\.ts$/,
            /src\/api\//,
            /src\/monitoring\//,
            /src\/utils\/GitIntegration\.ts$/,
            /src\/utils\/ResourceCleanup\.ts$/,
            /src\/core\/UnifiedSystem\.ts$/,
            /src\/core\/UnifiedMetaphysicalInterface\.ts$/,
            /src\/core\/PatternRecognition\.ts$/,
            /src\/core\/PatternRegistry\.ts$/,
            /src\/core\/Observer\.ts$/,
            /src\/core\/CoilMixin\.ts$/,
            /src\/core\/CoilSystem\.ts$/,
            /src\/core\/InfiniteDimensionalRefactor\.ts$/,
            /src\/field\//,
            /src\/void\//,
            /src\/unity\//,
            /src\/integrity\//,
            /src\/consciousness\/SelfEvolvingConsciousness\.ts$/
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "buffer": require.resolve("buffer/"),
        "path": require.resolve("path-browserify"),
        "url": require.resolve("url/"),
        "querystring": require.resolve("querystring-es3"),
        "fs": false,
        "net": false,
        "http": false,
        "https": false,
        "zlib": false,
        "child_process": false,
        "events": require.resolve("events/"),
      },
    },
    output: {
      filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
    ],
    devServer: {
      static: './dist',
      hot: true,
      port: 3000,
    },
  };
}; 