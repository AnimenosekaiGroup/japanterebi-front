/**
 * PostCSS Configuration
 *
 * © Anime no Sekai — 2021 
 */

module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('autoprefixer'),
    require('cssnano-preset-default')
  ]
}