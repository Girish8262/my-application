import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import getAppRoutes from './Routes/getAppRoutes';
import styles from './App.module.css'; // Import the CSS Module
import NavigationBar from './Components/Navigation/NavigationBar';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.container}>
          <NavigationBar />
          <main className={styles.mainContent}>
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
