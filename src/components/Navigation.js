import React from 'react';
import { Link } from 'react-scroll';
import './Navigation.css'; // Import the external CSS file

function Navigation() {
  return (
    <nav className="horizontal-navigation">
      <ul>
        <li>
          <Link to="about" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li>
          <Link to="projects" smooth={true} duration={500}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
