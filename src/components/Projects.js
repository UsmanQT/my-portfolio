import React from 'react';

const projects = [
  {
    title: 'Rent a Bike',
    date: 'Jan. 2023 – May. 2023',
    description: 'A bike rental service provider application developed for both the bike owners and the renter. Deployed the app on expo for testing purposes and successfully tested on 5 users.',
    link: 'Link to the Project "Rent a Bike"',
  },
  {
    title: 'Audio Hub',
    date: 'Jan. 2023 – May. 2023',
    description: 'Web Application for Exploring and Playing Music. Developed the website using React JS, NodeJS, express JS and backed powered by MongoDB. Deployed the website live on a virtual instance of Google Cloud Platform (GCP).',
    link: 'Link to the Project'
  },
  {
    title: 'No Waiting App',
    date: 'Jan. 2022 – Aug. 2022',
    description: 'Mobile Application for reservations at University’s Gym, Cafeteria and Library. Developed a flutter application to reduce waiting time for reservations at university buildings.',
  },
  {
    title: 'Elexia [Final Year Project]',
    date: 'Feb. 2020 – Feb. 2021',
    description: 'Computer-Based Intervention Game for Dyslexic Children. Collaborated with my supervisors to develop a game using C# and unity gaming engine to enhance learning abilities of Dyslexic Children.',
    Link: 'Link'
  }
  // Add more projects here
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h3>{project.title}</h3>
            <p>Date: {project.date}</p>
            <p>{project.description}</p>
            <p>Link: {project.link}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
