import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import getAppRoutes from './Routes/getAppRoutes';
import './App.css';
import NavigationBar from './Components/Navigation/NavigationBar';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <NavigationBar />
          <main className="main-content">
          <Header />
            <Routes>
              {getAppRoutes()}
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
