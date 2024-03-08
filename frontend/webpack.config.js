const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js' 
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] 
          }
        }
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'] 
  },

  devServer: {
    static: './dist', 
    hot: true
  }
};
