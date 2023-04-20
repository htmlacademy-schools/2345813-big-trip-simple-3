const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/main.js', // точка входа
  output: {
    filename: 'bundle.js', // имя файла сборки (бандла)
    path: path.resolve(__dirname, 'build'), // директория для сборки
  },
  mode: 'development', // режим разработки
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/, // применяем loader только к файлам с расширением .js
        exclude: /node_modules/, // исключаем папку node_modules из обработки
        use: {
          loader: 'babel-loader', // используем babel-loader
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'public', to: 'public' }] })
  ],

};
