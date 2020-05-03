const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, trailingSlash: false });
        createNodeField({
            node,
            name: `slug`,
            value: slug,
          });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  layout
                }
                fields {
                  slug
                }
              }
            }
          }
      }
    `)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/${node.frontmatter.layout}.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
  }