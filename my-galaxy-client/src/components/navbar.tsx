import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
    return(
        <nav className="navbar">
        <ul className="nav-links">
            <li>
            <Link to="/people">People</Link>
            </li>
            <li>
            <Link to="/planets">Planets</Link>
            </li>
        </ul>
      </nav>
    )
}

export default Navbar