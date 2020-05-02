import React from "react"
import "../assets/sass/main.scss"

const Header = (props) => {
    const links = [];
    props.refs.forEach((ref) => {
        links.push(<li><a href={ref.ref}>{ref.name}</a></li>);
    });

    return (
        <header>
            <div class="menu">
                <ul>
                    {links}
                </ul>
            </div>
        </header>
    );
}

export default Header