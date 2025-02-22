import { Link, NavLink } from "react-router-dom"
import ThemeSwitch from "./ThemeSwitch"

const Header = () => {
    return (
        <header className="header-container">
            <div className="header-elements-container">
                <Link to="/">
                    <div className="logo"></div>
                </Link>
                <ThemeSwitch/>
            </div>
            <nav className="header-links-container">
                <NavLink to="/" className={({ isActive }) => (isActive ? "header-links active" : "header-links")}>
                    Home
                </NavLink>
                <NavLink to="/favorites" className={({ isActive }) => (isActive ? "header-links active" : "header-links")}>
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;