// @flow

import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import './dark-mode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function toggleDarkMode(setDarkness, mode) {
  setDarkness(mode);
}

const DarkMode = () => {
  const [darkness, setDarkness] = useState('clear');

  return (
    <ButtonGroup size="sm" className="m-3">
      <Button
        className="dark-switch remove-outline light-button"
        onClick={() => toggleDarkMode(setDarkness, 'light-mode')}
        active={darkness === 'light-mode'}
      >
        <FontAwesomeIcon icon={['fas', 'lightbulb']} />
        <i className="fas fa-lightbulb" />
      </Button>
      <Button
        className="dark-switch remove-outline clear-button"
        onClick={() => toggleDarkMode(setDarkness, 'clear')}
        active={darkness === 'clear'}
      />
      <Button
        className="dark-switch remove-outline dark-button fas"
        onClick={() => toggleDarkMode(setDarkness, 'dark-mode')}
        active={darkness === 'dark-mode'}
      >
        <FontAwesomeIcon icon={['far', 'lightbulb']} />
        <i className="far fa-lightbulb" />
      </Button>
    </ButtonGroup>
  );
};

export default DarkMode;
