// @flow

import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import './dark-mode.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DarkModes } from '../../../store/session/session.constants';

function toggleDarkMode(setDarkness, mode) {
  setDarkness(mode);
}

const DarkMode = () => {
  const [darkness, setDarkness] = useState(DarkModes.CLEAR_MODE);

  return (
    <ButtonGroup size="sm" className="m-3">
      <Button
        className="dark-switch remove-outline light-button"
        onClick={() => toggleDarkMode(setDarkness, DarkModes.LIGHT_MODE)}
        active={darkness === DarkModes.LIGHT_MODE}
      >
        <FontAwesomeIcon icon={['fas', 'lightbulb']} />
        <i className="fas fa-lightbulb" />
      </Button>
      <Button
        className="dark-switch remove-outline clear-button"
        onClick={() => toggleDarkMode(setDarkness, DarkModes.CLEAR_MODE)}
        active={darkness === DarkModes.CLEAR_MODE}
      />
      <Button
        className="dark-switch remove-outline dark-button fas"
        onClick={() => toggleDarkMode(setDarkness, DarkModes.DARK_MODE)}
        active={darkness === DarkModes.DARK_MODE}
      >
        <FontAwesomeIcon icon={['far', 'lightbulb']} />
        <i className="far fa-lightbulb" />
      </Button>
    </ButtonGroup>
  );
};

export default DarkMode;
