// Navigation List: A horizontally wrapping list of links.

import { NavLink } from "react-router-dom";

export default function NavList({ links }) {
	return (
		<nav className="nav-list">
			{Object.keys(links).map(title => {
				return <NavLink to={links[title]} key={title}>{title}</NavLink>;
			})}
		</nav>
	);
}