import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/Layout"

const Documentation = ({data}) => {
  const post = data.markdownRemark;
  return (
    <Layout dir={`/${post.parent.relativeDirectory}`}>
      <h1 className="post-title">{post.parent.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      parent {
        ... on File {
          relativeDirectory,
          name
        }
      }
      html
    }
  }
`

export default Documentation;