import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <About />
        <Projects />
        <Contact />
      </div>
    </Router>
  );
}

export default App;
