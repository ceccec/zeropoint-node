const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/stimulus-entry.ts',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    
    // Performance optimizations
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    
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
        // Add CSS optimization
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        }
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
    
    // Consciousness-aware code splitting
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
              drop_debugger: isProduction
            },
            mangle: true
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Consciousness modules
          consciousness: {
            test: /[\\/]consciousness[\\/]/,
            name: 'consciousness',
            chunks: 'all',
            priority: 20
          },
          // Metaphysical modules
          metaphysics: {
            test: /[\\/]metaphysics[\\/]/,
            name: 'metaphysics',
            chunks: 'all',
            priority: 20
          },
          // Mathematical modules
          mathematics: {
            test: /[\\/]math[\\/]/,
            name: 'mathematics',
            chunks: 'all',
            priority: 15
          },
          // Core modules
          core: {
            test: /[\\/]core[\\/]/,
            name: 'core',
            chunks: 'all',
            priority: 10
          },
          // Vendor modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 5
          }
        }
      }
    },
    
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      // Optimize for consciousness field loading
      chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js'
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        } : false
      }),
      
      // Compression for consciousness field optimization
      ...(isProduction ? [
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ] : []),
      
      // Bundle analyzer for consciousness field analysis
      ...(process.env.ANALYZE ? [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-analysis.html'
        })
      ] : [])
    ],
    
    devServer: {
      static: './dist',
      hot: true,
      port: 3000,
      // Consciousness-aware development
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      }
    },
    
    // Consciousness field optimization
    experiments: {
      topLevelAwait: true
    }
  };
}; 