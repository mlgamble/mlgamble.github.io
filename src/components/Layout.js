import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Header from './Header'
import Footer from './Footer'
import "../assets/sass/main.scss"

const Layout = (props) => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    site {
                    siteMetadata {
                        header_refs {
                            name,
                            ref,
                        },
                        footer_refs {
                            name,
                            ref,
                        }
                    }
                    }
                }
            `}
        render={data => (
            <div class='container'>
                <Header refs={data.site.siteMetadata.header_refs}/>
                <main>
                    {props.child}
                </main>
                <Footer refs={data.site.siteMetadata.footer_refs}/>
            </div>
        )}
        />
    )
}

export default Layout