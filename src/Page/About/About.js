import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function About(){
    return (
        <div className='about'>
          <p>whats up!!!! <FontAwesomeIcon icon={faCoffee} /></p>
        </div>
      );
}

export default About;