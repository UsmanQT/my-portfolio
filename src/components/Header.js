import React from 'react';
import './Header.css';
import myPic from './my-pic.jpeg';
function Header() {
  return (
    <header>
      
      <div className="header-content">
        <h1>Usman Tahir Qureshi</h1>
        <p>Masters in Applied Computer Science</p>
        <p>Grand Valley State University</p>
        <p>Graduate Research Assistant - Full Stack Developer at ACI GVSU</p>
      </div>
      <div className="avatar-container">
      <img src={myPic} alt="Avatar" className="avatar-image" />
      </div>
    </header>
  );
}

export default Header;
