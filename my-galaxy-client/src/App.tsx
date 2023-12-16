import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import PeopleComponent from './components/peopleComponent';
import PlanetsComponent from './components/planetsComponent';
import Navbar from './components/navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
    <Routes>
      <Route path="/people" element={<PeopleComponent />} />
      <Route path="/planets" element={<PlanetsComponent />} />
    </Routes>
  </Router>
  );
}

export default App;
