/**
 * PostCSS Configuration
 *
 * © Anime no Sekai — 2021 
 */

module.exports = {
  plugins: [
    require('postcss-preset-env')({}),
    require('autoprefixer')({ browsers: ['defaults'] }),
    require('cssnano')({preset: 'default'})
  ]
}