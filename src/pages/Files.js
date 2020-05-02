import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout';
import "../assets/sass/main.scss"

const Files = ({data}) => {
    const pages = data.allMarkdownRemark.nodes
    const directories = [...new Set(pages.map((page) => page.parent.relativeDirectory))].sort()

    let directoryIndex = 0
    return (
        <Layout>
            <div className="toc">
                <h2>Jumps</h2>
                <div>
                    <ul>
                        {directories.map((dir) => <li key={dir}><a href={`#${dir}`}>{`/${dir}`}</a></li>)}
                    </ul>
                </div>
            </div>
            <h3>Files</h3>
            <div className="links">
                <ul>
                    {pages.map((page) => {
                        const link = <a href={page.fields.slug}>{page.fields.slug}</a>
                        if (page.parent.relativeDirectory === directories[directoryIndex]) {                           
                            directoryIndex += 1
                            return <li key={link} id={page.parent.relativeDirectory}>{link}</li>
                        } else {
                            return <li key={link}>{link}</li>
                        }
                    })}
                </ul>
            </div>

        </Layout>
    );
}

export const query = graphql`
query {
    allMarkdownRemark(sort: {fields: fields___slug, order: ASC}) {
      nodes {
        fields {
          slug
        }
        parent {
          ... on File {
            relativeDirectory
          }
        }
      }
    }
  }
`

export default Files