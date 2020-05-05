import React from "react"
import "../assets/sass/main.scss"

const Footer = (props) => {
    const links = [];
    props.refs.forEach((ref) => {
        links.push(<a key={ref.ref} href={ref.ref}>{ref.name}</a>);
    });

    return (
        <footer>
            {links}
        </footer>
    );
}

export default Footer