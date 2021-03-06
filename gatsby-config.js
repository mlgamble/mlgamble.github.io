/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    header_refs: [
      {name: '/', ref: '/'},
      {name: '/files', ref: '/files'},
    ],
    footer_refs: [
      {name: 'github', ref: 'https://github.com/mlgamble'},
      {name: 'email', ref: 'mailto:m.g@mble.dev'}
    ],
  },
  /* Your site config here */
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-prismjs`,
          `gatsby-remark-mathjax`,
        ]
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: "/",
        icon: "static/wallis.ico"
      },
    },
  ],
}
