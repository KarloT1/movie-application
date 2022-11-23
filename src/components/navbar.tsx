import { NavLink, Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Search from "./search";

export interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

const Navbar = ({ handleChange }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} className="img-fluid" alt="Site logo" />
        </Link>

        <Search handleChange={handleChange} />

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navlist">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navlist">
          <ul className="navbar-nav ms-auto text-end">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movie-discovery" className="nav-link">
                Movie Discovery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movie-details" className="nav-link">
                Movie Details
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar