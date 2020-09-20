// @flow

import React, { useCallback } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { FiSun, FiMoon } from 'react-icons/fi';
import { DarkModes } from '../../../store/session/session.constants';
import { updateDarkMode } from '../../../store/session/session.action';
import { getDarkMode } from '../../../store/session/session.selector';

const DarkMode = () => {
  const dispatch = useDispatch();
  const darkness = useSelector((state) => getDarkMode(state));
  const changeDarkMode = (mode) => {
    dispatch(updateDarkMode(mode));
  };
  const handleClick = useCallback(changeDarkMode, [dispatch]);

  return (
    <ButtonGroup size="sm" className="dark-mode-group m-3">
      <Button
        className="dark-switch remove-outline light-button"
        onClick={() => handleClick(DarkModes.LIGHT_MODE)}
        active={darkness === DarkModes.LIGHT_MODE}
      >
        <FiSun />
      </Button>
      <Button
        className="dark-switch remove-outline clear-button"
        onClick={() => handleClick(DarkModes.CLEAR_MODE)}
      />
      <Button
        className="dark-switch remove-outline dark-button"
        onClick={() => handleClick(DarkModes.DARK_MODE)}
        active={darkness === DarkModes.DARK_MODE}
      >
        <FiMoon />
      </Button>
    </ButtonGroup>
  );
};

export default DarkMode;
