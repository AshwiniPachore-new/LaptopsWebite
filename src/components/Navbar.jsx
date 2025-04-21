// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";
import img from "../../public/laptop1.png"


const Navbar = () => {
    return (
        <nav className="nav" >
            <img className="imglogo" src={img} height="70px" alt="laptop image cannot load" />
            <h1 className="h2">NextGenLaptops..</h1>

            <div className="navbar">
            <Link to="/" style={{ margin: "40px" }}>Home</Link>
            <Link to="/brands" style={{ margin: "40px" }}>Brands</Link>
            <Link to="/about" style={{ margin: "40px" }}>About</Link>
            <Link to="/contact" style={{ margin: "40px" }}>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
