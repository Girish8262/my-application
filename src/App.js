import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import GlobalHeader from './Global Components/GlobalHeader';
import GlobalFooter from './Global Components/GlobalFooter';
import GlobalNavigationBar from './Global Components/GlobalNavigationBar';
import getAppRoutes from './getAppRoutes';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <GlobalNavigationBar />
          <main className="main-content">
          <GlobalHeader />
            <Routes>
              {getAppRoutes()}
            </Routes>
            <GlobalFooter />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
