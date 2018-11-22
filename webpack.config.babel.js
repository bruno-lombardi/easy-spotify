import { join } from 'path'

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper'
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ]
  }
}