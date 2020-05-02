import React from "react"
import "../assets/sass/main.scss"

const Header = ({refs, dir}) => {
    const links = [];
    refs.forEach((ref) => {
        links.push(<li key={ref.ref}><a href={ref.ref}>{ref.name}</a></li>);
    });

    return (
        <header>
            <div className="menu">
                {dir != null && dir !== "" && <div className="directory">{dir}</div>}
                <ul>
                    {links}
                </ul>
            </div>
        </header>
    );
}

export default Header