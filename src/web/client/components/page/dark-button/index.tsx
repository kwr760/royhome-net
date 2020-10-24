import React, { useCallback } from 'react';
import { Button } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { FiSun, FiMoon } from 'react-icons/fi';
import { DarkModes } from '../../../store/session/session.constants';
import { updateDarkMode } from '../../../store/session/session.slice';
import { getDarkMode } from '../../../store/session/session.selector';

const DarkButton = (): JSX.Element => {
  const dispatch = useDispatch();
  const darkness = useSelector((state) => getDarkMode(state));
  const changeDarkMode = (mode) => {
    dispatch(updateDarkMode(mode));
  };
  const handleClick = useCallback(changeDarkMode, [dispatch]);
  const Icon = (darkness === DarkModes.DARK_MODE) ? <FiMoon className="moon-fix" /> : <FiSun />;
  const mode = (darkness === DarkModes.DARK_MODE) ? DarkModes.LIGHT_MODE : DarkModes.DARK_MODE;

  return (
    <Button className="dark-button border-0 m-3" onClick={() => handleClick(mode)}>
      {Icon}
    </Button>
  );
};

export default DarkButton;
