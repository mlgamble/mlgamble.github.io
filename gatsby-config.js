/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    header_refs: [
      {name: '/', ref: '/Home'},
      {name: '/files', ref: '/Files'},
    ],
    footer_refs: [
      {name: 'github', ref: 'https://github.com/mlgamble'},
      {name: 'email', ref: 'mailto:m.g@mble.dev'}
    ],
  },
  /* Your site config here */
  plugins: [
    'gatsby-plugin-sass',
  ],
}
