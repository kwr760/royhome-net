// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownToggle,
} from 'reactstrap';

import { useSelector } from 'react-redux';
import { getUser } from '../../../store/user/user.selector';

type Props = {|
  name: string,
|}

const NavProfileDropDownToggle = ({ name }: Props) => {
  const user = useSelector((state) => getUser(state, null));
  const picture = (user && user.picture) || '';

  return (
    <DropdownToggle nav caret id="profileDropDown">
      <img
        src={picture}
        alt={name}
        className="nav-user-profile rounded-circle"
        width="50"
      />
    </DropdownToggle>
  );
};

NavProfileDropDownToggle.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavProfileDropDownToggle;
