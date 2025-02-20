import { Link, NavLink } from "react-router-dom"
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <header className="header-container">
            <div>
                <Link to="/">
                    <img src={logo} alt="Reiz-Tech-logo" className="logo" />
                </Link>
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