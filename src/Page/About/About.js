import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import styles from './About.module.css';

function About(){
    return (
        <div className={styles.about}>
          <p>whats up!!!! <FontAwesomeIcon icon={faCoffee} /></p>
        </div>
      );
}

export default About;