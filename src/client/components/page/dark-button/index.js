// @flow

import React, { useCallback } from 'react';
import { Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModes } from '../../../store/session/session.constants';
import { updateDarkMode } from '../../../store/session/session.action';
import { getDarkMode } from '../../../store/session/session.selector';

const DarkButton = () => {
  const dispatch = useDispatch();
  const darkness = useSelector((state) => getDarkMode(state));
  const changeDarkMode = (mode) => {
    dispatch(updateDarkMode(mode));
  };
  const handleClick = useCallback(changeDarkMode, [dispatch]);
  const icon = (darkness === DarkModes.DARK_MODE) ? ['fas', 'lightbulb'] : ['far', 'lightbulb'];
  const mode = (darkness === DarkModes.DARK_MODE) ? DarkModes.LIGHT_MODE : DarkModes.DARK_MODE;

  return (
    <Button className="dark-button border-0 m-3" onClick={() => handleClick(mode)}>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export default DarkButton;
