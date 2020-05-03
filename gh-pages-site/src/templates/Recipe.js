import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/Layout"

const Recipe = ({data}) => {
    const post = data.markdownRemark;
    const frontmatter = post.frontmatter
    return (
        <Layout dir={`/${post.parent.relativeDirectory}`}>
            <h1 class="post-title">{post.parent.name}</h1>
            <a href={frontmatter.recipe}>base recipe</a>
            <div class="recipe">
                <div class="measurements">
                    <b>Measurements</b>
                    <table>
                        {frontmatter.measurements.map((measurement) => (
                            <tr>
                            <td>{measurement.thing}</td>
                            <td>{measurement.amount}</td>
                            <td>{measurement.unit}</td>
                        </tr>
                        ))}
                    </table>
                </div>
                <div class="content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
            <div class="derivatives">
                <h3>Recipes that use this:</h3>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        parent {
            ... on File {
                relativeDirectory
                name
            }
        }
        frontmatter {
            recipe
            measurements {
                thing
                amount
                unit
            }
        }
        html
    }
  }
`

export default Recipe