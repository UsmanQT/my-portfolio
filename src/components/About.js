import React from 'react';

function About() {
  return (
    <section id="about" className="about">
      <h2>Welcome to my Portfolio</h2>
      <p className="aboutme">
      My name is Usman Tahir Qureshi and I am currently pursuing a Master's degree in Applied Computer Science. I am based in Grand Rapids, Michigan. I am a full-stack developer with experience in mobile and web application development.
      </p>
      <p className="aboutme">
        I am passionate about developing web and mobile applications with interactive front-end and efficient back-end allowing users to have a wonderful experience on the application.
        <h3>My hobbies are: </h3>
        <ul>
          <li>I like to play guitar, sing and also write songs. I have written a few songs in Urdu language.</li>
          <li>I like to play cricket, football (soccer) and go on hikes in the mountains where you could only camp for the night.</li>
          <li>I like star gazing at night which is because of my interest in knowing more about our universe and what is out there.</li>
        </ul>
      </p>
      {/* Include your work description here */}
    </section>
  );
}

export default About;
